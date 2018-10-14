/**** TODO: refactor out this file into multiple pieces *****/
// The idea is to combine larger sequences of actions into thunks

import { ThunkDispatch } from "redux-thunk";

import { ChainId } from "@iov/core";

import { BlockchainSpec, keyToAddress, takeFaucetCredit } from "../logic";
import { RootActions, RootState } from "../reducers";
import { addBlockchainAsyncAction, createSignerAction, getAccountAsyncAction } from "../reducers/blockchain";
import { createProfileAsyncAction, getIdentityAction } from "../reducers/profile";

type RootThunkDispatch = ThunkDispatch<RootState, any, RootActions>;

// boot sequence initializes all objects
// this is a thunk-form of redux-saga
export const bootSequence = (password: string, blockchains: ReadonlyArray<BlockchainSpec>) => async (
  dispatch: RootThunkDispatch,
  getState: () => RootState,
) => {
  // --- initialize the profile
  // TODO: make selectors for this?
  const db = getState().profile.internal.db;
  // TODO: hmm... seems like I need to add empty args for start....
  const res1 = dispatch(createProfileAsyncAction.start(db, password, {}));
  const profile = await res1.payload;

  // --- get the active identity
  const {
    payload: { identity },
  } = dispatch(getIdentityAction(profile));

  // --- initiate the signer
  const { payload: signer } = dispatch(createSignerAction(profile));

  // --- connect all readers and query account balances
  for (const blockchain of blockchains) {
    const res2 = dispatch(addBlockchainAsyncAction.start(signer, blockchain, {}));
    const conn = await res2.payload;
    const res3 = dispatch(getAccountAsyncAction.start(conn, identity, undefined));
    await res3.payload;
  }

  // return the MultiChainSigner if we want to sequence something else after this
  return signer;
};

export const drinkFaucetSequence = (facuetUri: string, chainId: ChainId) => async (
  dispatch: RootThunkDispatch,
  getState: () => RootState,
) => {
  // TODO: make selectors for this?
  const active = getState().profile.activeIdentity;
  if (!active) {
    throw new Error("You must activate an identity before drinking from the faucet");
  }
  const { identity } = active;

  // take a drink from the faucet
  const address = keyToAddress(identity);
  await takeFaucetCredit(facuetUri, address, undefined);

  // now, get the new account info
  // TODO: another selector, coming up
  const conn = getState().blockchain.internal.connections[chainId];
  if (!conn) {
    throw new Error(`Cannot query on unknown chain: ${chainId}`);
  }
  const { payload } = await dispatch(getAccountAsyncAction.start(conn, identity, undefined));
  return payload;
};
