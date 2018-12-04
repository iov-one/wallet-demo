/**** TODO: refactor out this file into multiple pieces *****/
// The idea is to combine larger sequences of actions into thunks

import { ThunkDispatch } from "redux-thunk";

import { Amount, BcpConnection, ConfirmedTransaction, TransactionKind } from "@iov/bcp-types";
import { ChainId, MultiChainSigner, TokenTicker } from "@iov/core";
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
  watchAccountAction,
} from "../reducers/blockchain";
import { fixTypes } from "../reducers/helpers";
import {
  addConfirmedTransaction,
  addPendingTransactionAction,
  removePendingTransactionAction,
  setTransactionErrorAction,
  watchTransactionAction,
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
    initAccounts = watchAccountAndTransactions(dispatch, conn, identity);
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
): ReadonlyArray<Promise<BcpAccountWithChain | undefined>> {
  let initAccounts: ReadonlyArray<Promise<BcpAccountWithChain | undefined>> = [];

  // we need to set a callback that resolves a promise
  // this is an ugly setup, but we need to block on the first result before we proceed, so the
  // next code in sequence works. but then also want to auto-update from the stream
  let cb: (acct?: BcpAccountWithChain, err?: any) => any;
  const prom = new Promise<BcpAccountWithChain | undefined>((resolve, reject) => {
    let done = false;
    cb = (acct?: BcpAccountWithChain, err?: any) => {
      // actually do the dispatching
      // Note: acct, err both undefined is valid for non-existent account
      if (!err) {
        dispatch(getAccountAsyncAction.success(acct));
      } else {
        dispatch(getAccountAsyncAction.failure(err));
      }
      // finish the promise for the first query
      if (!done) {
        done = true;
        if (!err) {
          resolve(acct);
        } else {
          reject(err);
        }
      }
    };
  });
  dispatch(watchAccountAction(conn, identity, cb!));
  initAccounts = [...initAccounts, prom];

  // this is a normal stream subscription for transactions
  const transCb = async (trans?: ConfirmedTransaction, err?: any) => {
    // conn will change in multiple calls of the for loop, we need to cache the current one in this scope
    const myConn = conn;
    if (err) {
      throw err;
    }
    if (trans && trans.transaction.kind === TransactionKind.Send) {
      const transInfo = await parseConfirmedTransaction(myConn, trans, identity);
      dispatch(addConfirmedTransaction(transInfo));
    }
  };
  dispatch(watchTransactionAction(conn, identity, transCb));

  return initAccounts;
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
