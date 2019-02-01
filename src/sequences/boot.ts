import { firstEvent } from "@iov/stream";
import debounce from "xstream/extra/debounce";

import {
  BcpConnection,
  ConfirmedTransaction,
  isConfirmedTransaction,
  PublicIdentity,
  TxCodec,
} from "@iov/bcp-types";
import { bnsCodec, BnsConnection } from "@iov/bns";
import { MultiChainSigner } from "@iov/core";

import {
  BlockchainSpec,
  cleanMnemonic,
  keyToAddress,
  parseConfirmedTransaction,
  resetProfile,
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
  setChainIds,
  TickerInfo,
  updateUsernameNft,
} from "~/reducers/blockchain";
import { fixTypes } from "~/reducers/helpers";
import { createProfileAsyncAction } from "~/reducers/profile";
import drinkFaucet from "~/routes/signupPass/store/actions/drinkFaucet";
import { getProfileDB, getSigner } from "~/selectors";
import { addConfirmedTransaction } from "~/store/notifications/actions";
import { allFaucetSpecs, loadConfig } from "~/utils/conf";

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
    dispatch(createProfileAsyncAction.start(db, password, cleaned, {})),
  );

  // --- initialize the signer
  const { payload: signer } = await fixTypes(dispatch(createSignerAction(profile)));

  // first we clarify the bns connection (which we need for later transaction resolution)
  const { value } = await fixTypes(dispatch(addBlockchainAsyncAction.start(signer, profile, bns, {})));
  const bnsConn = value.connection as BnsConnection;
  dispatch(setBnsChainId(bnsConn.chainId()));

  // and set it as first account/tickers
  let initAccounts: ReadonlyArray<Promise<AccountInfo>> = [
    watchAccountAndTransactions(dispatch, bnsConn, bnsConn, value.identity, bnsCodec),
  ];
  let initTickers: ReadonlyArray<Promise<{ readonly value: TickerInfo }>> = [getTickers(dispatch, bnsConn)];

  // then we connect all other chains, in parallel
  // bns chain is the first one we connect to, so we can pull out the chainId later
  for (const blockchain of blockchains) {
    const { value: chain } = await fixTypes(
      dispatch(addBlockchainAsyncAction.start(signer, profile, blockchain, {})),
    );
    initAccounts = [
      ...initAccounts,
      watchAccountAndTransactions(dispatch, bnsConn, chain.connection, chain.identity, chain.codec),
    ];
    initTickers = [...initTickers, getTickers(dispatch, chain.connection)];
  }

  // wait for all accounts and tickers to initialize
  const tickers = await Promise.all(initTickers);
  const orderedChains = tickers.map(ti => ti.value.chainId);
  dispatch(setChainIds(orderedChains));

  let accounts: ReadonlyArray<AccountInfo> = await Promise.all(initAccounts);
  const bnsAccount = accounts[0];

  if (bnsAccount) {
    if (!bnsAccount.account) {
      const config = await loadConfig();
      const faucets = allFaucetSpecs(config);
      await dispatch(drinkFaucet(faucets, accounts));
      await firstEvent(
        bnsConn.watchAccount({ address: bnsAccount.address }).filter(event => event !== undefined),
      );
      await dispatch(getAccountAsyncAction.start(bnsConn, value.identity, bnsCodec, {}));
    }

    // just lookup first bns account, that should match all....
    const { value: usernameNft } = await fixTypes(
      dispatch(
        getUsernameNftByChainAddressAsyncAction.start(bnsConn, bnsAccount.chainId, bnsAccount.address, {}),
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
  const tickerAction = getTickersAsyncAction.start(conn, {}, {}, {});
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

  const accountAction = getAccountAsyncAction.start(conn, identity, codec, {});
  // don't wait on the dispatch here, we return the result of the dispatch to await on by client
  dispatch(accountAction);
  const fetchedAccount = accountAction.payload;

  // get a stream of all transactions
  const address = keyToAddress(identity, codec);
  const stream = conn.liveTx({ sentFromOrTo: address });

  // process incoming transactions and add to dispatched/redux store
  const handleTx = async (trans: ConfirmedTransaction) => {
    // conn will change in multiple calls of the for loop, we need to cache the current one in this scope
    const transInfo = await parseConfirmedTransaction(bnsConn, conn, trans, identity, codec);
    if (transInfo) {
      dispatch(addConfirmedTransaction(transInfo));
    }
  };
  stream.subscribe({
    next: x => {
      if (!isConfirmedTransaction(x)) {
        throw new Error("Confirmed transaction expected");
      }
      handleTx(x);
    },
    error: err => {
      throw err;
    },
  });

  // update accounts on new transactions (with debounce)
  const onChangeAccount = async () => {
    dispatch(getAccountAsyncAction.start(conn, identity, codec, {}));
  };
  // make sure we only query once per block or search return at max
  stream.compose(debounce(200)).subscribe({ next: onChangeAccount });

  return fetchedAccount; // resolved when first account is loaded
}

// the odd signature is to allow this to work as a thunk, so it can be used like:
// dispatch(shutdownSequence)
// we only have access to the state itself in tests
export function shutdownSequence(_: any, getState: () => RootState): void {
  const signer = getSigner(getState());
  if (signer) {
    signer.shutdown();
  }
}
