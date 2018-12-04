/**** TODO: refactor out this file into multiple pieces *****/
// The idea is to combine larger sequences of actions into thunks

import { ThunkDispatch } from "redux-thunk";
import debounce from "xstream/extra/debounce";

import { ChainId } from "@iov/base-types";
import { Amount, BcpConnection, BcpTxQuery, ConfirmedTransaction } from "@iov/bcp-types";
import { bnsFromOrToTag, MultiChainSigner, TokenTicker } from "@iov/core";
import { PublicIdentity } from "@iov/keycontrol";

import {
  BlockchainSpec,
  keyToAddress,
  parseConfirmedTransaction,
  resetProfile,
  resolveAddress,
  sendTransaction,
  setName,
  takeFaucetCredit,
} from "../logic";
import { RootActions, RootState } from "../reducers";
import {
  addBlockchainAsyncAction,
  BcpAccountWithChain,
  createSignerAction,
  getAccountAsyncAction,
} from "../reducers/blockchain";
import { fixTypes } from "../reducers/helpers";
import {
  addConfirmedTransaction,
  addPendingTransactionAction,
  removePendingTransactionAction,
  setTransactionErrorAction,
} from "../reducers/notification";
import { createProfileAsyncAction, getIdentityAction } from "../reducers/profile";
import { getProfileDB, requireActiveIdentity, requireConnection, requireSigner } from "../selectors";

type RootThunkDispatch = ThunkDispatch<RootState, any, RootActions>;

export const resetSequence = (password: string) => async (
  _: RootThunkDispatch,
  getState: () => RootState,
) => {
  const db = getProfileDB(getState());
  return resetProfile(db, password);
};

export interface BootResult {
  readonly signer: MultiChainSigner;
  readonly accounts: ReadonlyArray<BcpAccountWithChain | undefined>;
}

// boot sequence initializes all objects
// this is a thunk-form of redux-saga
// tslint:disable-next-line:only-arrow-functions
export const bootSequence = (password: string, blockchains: ReadonlyArray<BlockchainSpec>) => async (
  dispatch: RootThunkDispatch,
  getState: () => RootState,
): Promise<BootResult> => {
  // --- initialize the profile
  const db = getProfileDB(getState());
  // TODO: hmm... seems like I need to add empty args for start....
  const { value: profile } = await fixTypes(dispatch(createProfileAsyncAction.start(db, password, {})));

  // --- get the active identity
  const {
    payload: { identity },
  } = dispatch(getIdentityAction(profile));

  // --- initiate the signer
  const { payload: signer } = fixTypes(dispatch(createSignerAction(profile)));

  // --- connect all readers and query account balances
  let initAccounts: ReadonlyArray<Promise<BcpAccountWithChain | undefined>> = [];
  for (const blockchain of blockchains) {
    const { value: conn } = await fixTypes(dispatch(addBlockchainAsyncAction.start(signer, blockchain, {})));
    initAccounts = [...initAccounts, watchAccountAndTransactions(dispatch, conn, identity)];
  }

  // wait for all accounts to initialize
  const accounts = await Promise.all(initAccounts);
  // return initial account state as well as signer
  return { accounts, signer };
};

function watchAccountAndTransactions(
  dispatch: RootThunkDispatch,
  conn: BcpConnection,
  identity: PublicIdentity,
): Promise<BcpAccountWithChain | undefined> {
  // request the current account and return a promise resolved when it is loaded
  const account = getAccountAsyncAction.start(conn, identity, undefined).payload;

  // get a stream of all transactions
  const address = keyToAddress(identity);
  const query: BcpTxQuery = { tags: [bnsFromOrToTag(address)] };
  const stream = conn.liveTx(query);

  // process incoming transactions and add to dispatched/redux store
  const handleTx = async (trans: ConfirmedTransaction) => {
    // conn will change in multiple calls of the for loop, we need to cache the current one in this scope
    const transInfo = await parseConfirmedTransaction(conn, trans, identity);
    dispatch(addConfirmedTransaction(transInfo));
  };
  stream.subscribe({
    next: handleTx,
    error: err => {
      throw err;
    },
  });

  // update accounts on new transactions (with debounce)
  const onChangeAccount = async () => {
    dispatch(getAccountAsyncAction.start(conn, identity, undefined));
  };
  // make sure we only query once per block or search return at max
  stream.compose(debounce(200)).subscribe({ next: onChangeAccount });

  return account; // resolved when first account is loaded
}

export const drinkFaucetSequence = (facuetUri: string, ticker: TokenTicker) => async (
  _: RootThunkDispatch,
  getState: () => RootState,
) => {
  const identity = requireActiveIdentity(getState());
  // --take a drink from the faucet
  const address = keyToAddress(identity);
  await takeFaucetCredit(facuetUri, address, ticker);
};

export const setNameSequence = (name: string, chainId: ChainId) => async (
  _: RootThunkDispatch,
  getState: () => RootState,
) => {
  const signer = requireSigner(getState());
  await setName(signer, chainId, name);
};

export const sendTransactionSequence = (
  chainId: ChainId,
  iovAddress: string,
  amount: Amount,
  memo: string,
  uniqId: string,
) => async (dispatch: RootThunkDispatch, getState: () => RootState) => {
  try {
    const signer = requireSigner(getState());
    const conn = requireConnection(getState(), chainId);
    const address = await resolveAddress(conn, iovAddress);
    dispatch(
      addPendingTransactionAction({
        id: uniqId,
        amount,
        receiver: iovAddress,
      }),
    );
    await sendTransaction(signer, chainId, address, amount, memo);
    dispatch(removePendingTransactionAction(uniqId));
  } catch (err) {
    dispatch(setTransactionErrorAction(err));
    dispatch(removePendingTransactionAction(uniqId));
  }
};
