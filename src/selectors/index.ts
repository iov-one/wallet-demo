import { ChainId } from "@iov/core";
import { createSelector } from "reselect";

import { RootState } from "../reducers";

/*** TODO: separate this out into multiple files ****/

export const getConnections = (state: RootState) => state.blockchain.internal.connections;
export const getSigner = (state: RootState) => state.blockchain.internal.signer;
export const getProfileDB = (state: RootState) => state.profile.internal.db;

export const getActiveWallet = (state: RootState) => state.profile.activeIdentity;
export const getActiveIdentity = createSelector(getActiveWallet, wallet => wallet && wallet.identity);

export const requireActiveIdentity = (state: RootState) => {
  const ident = getActiveIdentity(state);
  if (!ident) {
    throw new Error("No identity active");
  }
  return ident;
};
export const requireConnection = (state: RootState, chainId: ChainId) => {
  const conn = getConnections(state)[chainId];
  if (!conn) {
    throw new Error(`No connection for chain: ${chainId}`);
  }
  return conn;
};
export const requireSigner = (state: RootState) => {
  const signer = getSigner(state);
  if (!signer) {
    throw new Error("Signer not yet initialized");
  }
  return signer;
};
