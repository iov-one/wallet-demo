/**** TODO: refactor out this file into multiple pieces *****/
// The idea is to combine larger sequences of actions into thunks

import { ThunkDispatch } from "redux-thunk";

import { FungibleToken } from "@iov/bcp-types";
import { ChainId } from "@iov/core";

import {
  BlockchainSpec,
  keyToAddress,
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

// boot sequence initializes all objects
// this is a thunk-form of redux-saga
// tslint:disable-next-line:only-arrow-functions
export const bootSequence = (password: string, blockchains: ReadonlyArray<BlockchainSpec>) => async (
  dispatch: RootThunkDispatch,
  getState: () => RootState,
) => {
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

  let initAccounts: ReadonlyArray<Promise<any>> = [];

  // --- connect all readers and query account balances
  for (const blockchain of blockchains) {
    const { value: conn } = await fixTypes(dispatch(addBlockchainAsyncAction.start(signer, blockchain, {})));

    // we need to set a callback that resolves a promise
    let cb: (acct?: BcpAccountWithChain, err?: any) => any;
    const prom = new Promise((resolve, reject) => {
      let done = false;
      cb = (acct?: BcpAccountWithChain, err?: any) => {
        // finish the promise for the first query
        if (!done) {
          done = true;
          if (acct) {
            resolve();
          } else {
            reject(err);
          }
        }
        // actual do the dispatching
        if (acct) {
          dispatch(getAccountAsyncAction.success(acct));
        } else {
          dispatch(getAccountAsyncAction.failure(err));
        }
      };
    });
    dispatch(watchAccountAction(conn, identity, cb!));
    initAccounts = [...initAccounts, prom];
  }

  // wait for all accounts to initialize
  Promise.all(initAccounts);

  // return the MultiChainSigner if we want to sequence something else after this
  return signer;
};

export const drinkFaucetSequence = (facuetUri: string, chainId: ChainId) => async (
  dispatch: RootThunkDispatch,
  getState: () => RootState,
) => {
  const identity = requireActiveIdentity(getState());
  // --take a drink from the faucet
  const address = keyToAddress(identity);
  await takeFaucetCredit(facuetUri, address, undefined);

  // now, get the new account info
  const conn = requireConnection(getState(), chainId);
  const { value } = await fixTypes(dispatch(getAccountAsyncAction.start(conn, identity, undefined)));
  return value;
};

export const setNameSequence = (name: string, chainId: ChainId) => async (
  dispatch: RootThunkDispatch,
  getState: () => RootState,
) => {
  const signer = requireSigner(getState());
  await setName(signer, chainId, name);

  // now, get the new account info
  const conn = requireConnection(getState(), chainId);
  const identity = requireActiveIdentity(getState());
  const { value } = await fixTypes(dispatch(getAccountAsyncAction.start(conn, identity, undefined)));
  return value;
};

export const sendTransactionSequence = (
  chainId: ChainId,
  iovAddress: string,
  amount: FungibleToken,
  memo: string,
) => async (dispatch: RootThunkDispatch, getState: () => RootState) => {
  const signer = requireSigner(getState());
  const conn = requireConnection(getState(), chainId);
  try {
    const address = await resolveAddress(conn, iovAddress);
    await sendTransaction(signer, chainId, address, amount, memo);

    // now, get the new account info

    const identity = requireActiveIdentity(getState());
    const { value } = await fixTypes(dispatch(getAccountAsyncAction.start(conn, identity, undefined)));
    return value;
  } catch (err) {
    console.log(err);
    return err;
  }
};
