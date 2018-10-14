/**** TODO: refactor out this file into multiple pieces *****/
// The idea is to combine larger sequences of actions into thunks

import { ThunkDispatch } from "redux-thunk";

import { RootActions, RootState } from "..";
import { BlockchainSpec } from "../../logic/connection";
import { addBlockchainAsyncAction, createSignerAction, getAccountAsyncAction } from "../blockchain";
import { createProfileAsyncAction, getIdentityAction } from "../profile";

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
    await dispatch(getAccountAsyncAction.start(conn, identity, undefined));
  }

  // return the MultiChainSigner if we want to sequence something else after this
  return signer;
};
