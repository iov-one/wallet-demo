import debounce from "xstream/extra/debounce";

import { BcpConnection, ConfirmedTransaction, TxCodec } from "@iov/bcp-types";
import { bnsCodec, BnsConnection } from "@iov/bns";
import { MultiChainSigner } from "@iov/core";
import { PublicIdentity } from "@iov/keycontrol";

import {
  BlockchainSpec,
  cleanMnemonic,
  fromOrToTag,
  keyToAddress,
  parseConfirmedTransaction,
  resetProfile,
  specToCodec,
} from "~/logic";
import { RootState } from "~/reducers";
import {
  AccountInfo,
  addBlockchainAsyncAction,
  createSignerAction,
  getAccountAsyncAction,
  getTickersAsyncAction,
  getUsernameNftByChainAddressAsyncAction,
  setBnsChainId,
  updateUsernameNft,
} from "~/reducers/blockchain";
import { fixTypes } from "~/reducers/helpers";
import { createProfileAsyncAction, getIdentityAction } from "~/reducers/profile";
import { getConnections, getProfileDB } from "~/selectors";
import { addConfirmedTransaction } from "~/store/notifications/actions";

import { RootThunkDispatch } from "./types";

// resetSequence will create a new profile (from mnemonic or random) and save it to disk
// it will NOT update the redux store.
// Most likely you will want to call bootSequence(...) after it is done
export const resetSequence = (password: string, mnemonic?: string) => async (
  _: RootThunkDispatch,
  getState: () => RootState,
) => {
  const db = getProfileDB(getState());
  return resetProfile(db, password, mnemonic);
};

export interface BootResult {
  readonly signer: MultiChainSigner;
  readonly accounts: ReadonlyArray<AccountInfo>;
}

// boot sequence initializes all objects
// this is a thunk-form of redux-saga
// tslint:disable-next-line:only-arrow-functions
export const bootSequence = (
  password: string,
  bns: BlockchainSpec,
  blockchains: ReadonlyArray<BlockchainSpec>,
  mnemonic?: string,
) => async (dispatch: RootThunkDispatch, getState: () => RootState): Promise<BootResult> => {
  // --- initialize the profile
  const db = getProfileDB(getState());

  // clean up mnemonic whitespace to be more forgiving of user-entered data
  const cleaned = mnemonic ? cleanMnemonic(mnemonic) : undefined;

  // note, if mnemonic is provided, it will always create a profile, over-writing any existing profile
  const { value: profile } = await fixTypes(
    dispatch(createProfileAsyncAction.start(db, password, cleaned, undefined)),
  );

  // --- get the active identity
  const {
    payload: { identity },
  } = await dispatch(getIdentityAction(profile));

  // --- initiate the signer
  const { payload: signer } = await fixTypes(dispatch(createSignerAction(profile)));

  // first we clarify the bns connection (which we need for later transaction resolution)
  const { value } = await fixTypes(dispatch(addBlockchainAsyncAction.start(signer, bns, {}, undefined)));
  const bnsConn = value as BnsConnection;
  dispatch(setBnsChainId(bnsConn.chainId()));
  // and set it as first account/tickers
  let initAccounts: ReadonlyArray<Promise<AccountInfo>> = [
    watchAccountAndTransactions(dispatch, bnsConn, bnsConn, identity, bnsCodec),
  ];
  let initTickers: ReadonlyArray<Promise<any>> = [getTickers(dispatch, bnsConn)];

  // then we connect all other chains, in parallel
  // bns chain is the first one we connect to, so we can pull out the chainId later
  for (const blockchain of blockchains) {
    const codec = specToCodec(blockchain);
    const { value: conn } = await fixTypes(
      dispatch(addBlockchainAsyncAction.start(signer, blockchain, {}, undefined)),
    );
    initAccounts = [...initAccounts, watchAccountAndTransactions(dispatch, bnsConn, conn, identity, codec)];
    initTickers = [...initTickers, getTickers(dispatch, conn)];
  }

  // wait for all accounts and tickers to initialize
  await Promise.all(initTickers);
  let accounts: ReadonlyArray<AccountInfo> = await Promise.all(initAccounts);
  const bnsAccount = accounts[0];

  if (bnsAccount) {
    // just lookup first bns account, that should match all....
    const { value: usernameNft } = await fixTypes(
      dispatch(
        getUsernameNftByChainAddressAsyncAction.start(
          bnsConn,
          bnsAccount.chainId,
          bnsAccount.address,
          undefined,
        ),
      ),
    );
    if (usernameNft) {
      accounts = updateUsernameNft(accounts, usernameNft);
    }
  }

  // return initial account state as well as signer
  return { accounts, signer };
};

function getTickers(dispatch: RootThunkDispatch, conn: BcpConnection): Promise<any> {
  const tickerAction = getTickersAsyncAction.start(conn, {}, {}, undefined);
  return fixTypes(dispatch(tickerAction));
}

async function watchAccountAndTransactions(
  dispatch: RootThunkDispatch,
  bnsConn: BnsConnection,
  conn: BcpConnection,
  identity: PublicIdentity,
  codec: TxCodec,
): Promise<AccountInfo> {
  // request the current account and return a promise resolved when it is loaded
  const accountAction = getAccountAsyncAction.start(conn, identity, codec, undefined);
  // don't wait on the dispatch here, we return the result of the dispatch to await on by client
  dispatch(accountAction);
  const fetchedAccount = accountAction.payload;

  // get a stream of all transactions
  const address = keyToAddress(identity, codec);
  const query = fromOrToTag(address);
  const stream = conn.liveTx(query);

  // process incoming transactions and add to dispatched/redux store
  const handleTx = async (trans: ConfirmedTransaction) => {
    // conn will change in multiple calls of the for loop, we need to cache the current one in this scope
    const transInfo = await parseConfirmedTransaction(bnsConn, conn, trans, identity, codec);
    if (transInfo) {
      dispatch(addConfirmedTransaction(transInfo));
    }
  };
  stream.subscribe({
    next: handleTx,
    error: err => {
      throw err;
    },
  });

  // update accounts on new transactions (with debounce)
  const onChangeAccount = async () => {
    dispatch(getAccountAsyncAction.start(conn, identity, codec, undefined));
  };
  // make sure we only query once per block or search return at max
  stream.compose(debounce(200)).subscribe({ next: onChangeAccount });

  return fetchedAccount; // resolved when first account is loaded
}

// the odd signature is to allow this to work as a thunk, so it can be used like:
// dispatch(shutdownSequence)
// we only have access to the state itself in tests
export function shutdownSequence(_: any, getState: () => RootState): void {
  const connections = getConnections(getState());
  Object.values(connections).forEach(conn => conn.disconnect());
}
