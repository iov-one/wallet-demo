/**** TODO: refactor out this file into multiple pieces *****/
// The idea is to combine larger sequences of actions into thunks

import { ThunkDispatch } from "redux-thunk";

import { ChainId } from "@iov/core";

import { BlockchainSpec, keyToAddress, takeFaucetCredit } from "../logic";
import { setName } from "../logic/account";
import { RootActions, RootState } from "../reducers";
import { addBlockchainAsyncAction, createSignerAction, getAccountAsyncAction } from "../reducers/blockchain";
import { unpromisify } from "../reducers/helpers";
import { createProfileAsyncAction, getIdentityAction } from "../reducers/profile";
import { getProfileDB, requireActiveIdentity, requireConnection, requireSigner } from "../selectors";

type RootThunkDispatch = ThunkDispatch<RootState, any, RootActions>;

// boot sequence initializes all objects
// this is a thunk-form of redux-saga
export const bootSequence = (password: string, blockchains: ReadonlyArray<BlockchainSpec>) => async (
  dispatch: RootThunkDispatch,
  getState: () => RootState,
) => {
  // --- initialize the profile
  const db = getProfileDB(getState());
  // TODO: hmm... seems like I need to add empty args for start....
  const { value: profile } = await unpromisify(dispatch(createProfileAsyncAction.start(db, password, {})));

  // --- get the active identity
  const {
    payload: { identity },
  } = dispatch(getIdentityAction(profile));

  // --- initiate the signer
  const { payload: signer } = dispatch(createSignerAction(profile));

  // --- connect all readers and query account balances
  for (const blockchain of blockchains) {
    const { value: conn } = await unpromisify(
      dispatch(addBlockchainAsyncAction.start(signer, blockchain, {})),
    );
    await unpromisify(dispatch(getAccountAsyncAction.start(conn, identity, undefined)));
  }

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
  const { value } = await unpromisify(dispatch(getAccountAsyncAction.start(conn, identity, undefined)));
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
  const { value } = await unpromisify(dispatch(getAccountAsyncAction.start(conn, identity, undefined)));
  return value;
};