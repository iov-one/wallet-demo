import { createSelector } from "reselect";

import { BcpAccount } from "@iov/bcp-types";
import { Address, ChainId, MultiChainSigner } from "@iov/core";
import { LocalIdentity } from "@iov/keycontrol";

import { RootState } from "../reducers";
import { AccountsByChainAndAddress, getAccountByChainAndAddress } from "../reducers/blockchain";

/*** TODO: separate this out into multiple files ****/

export interface ChainAddress {
  readonly chainId: ChainId;
  readonly address: Address;
}

export interface ChainAccount {
  readonly chainId: ChainId;
  readonly account?: BcpAccount;
}

export const getProfileDB = (state: RootState) => state.profile.internal.db;
export const getProfile = (state: RootState) => state.profile.internal.profile;

export const getSigner = (state: RootState) => state.blockchain.internal.signer;
export const getConnections = (state: RootState) => state.blockchain.internal.connections;
export const getChainIds: (state: RootState) => ReadonlyArray<ChainId> = createSelector(
  getConnections,
  conns => Object.keys(conns).map(x => x as ChainId),
);

export const getActiveWallet = (state: RootState) => state.profile.activeIdentity;
export const getActiveIdentity: (state: RootState) => LocalIdentity | undefined = createSelector(
  getActiveWallet,
  wallet => wallet && wallet.identity,
);

export const getActiveChainAddresses: (state: RootState) => ReadonlyArray<ChainAddress> = createSelector(
  getSigner,
  getActiveIdentity,
  getChainIds,
  (
    signer: MultiChainSigner | undefined,
    identity: LocalIdentity | undefined,
    chainIds: ReadonlyArray<ChainId>,
  ) =>
    identity === undefined || signer === undefined
      ? []
      : chainIds.map(chainId => ({ chainId, address: signer.keyToAddress(chainId, identity.pubkey) })),
);

export const getAllAccounts = (state: RootState) => state.blockchain.accounts;

export const getMyAccounts: (state: RootState) => ReadonlyArray<ChainAccount> = createSelector(
  getAllAccounts,
  getActiveChainAddresses,
  (balances: AccountsByChainAndAddress, addresses: ReadonlyArray<ChainAddress>) =>
    addresses.map(({ chainId, address }) => ({
      chainId,
      account: getAccountByChainAndAddress(balances, chainId, address).account,
    })),
);

export const getPendingTransactions = (state: RootState) => state.notification.pending || [];
export const getTransactions = (state: RootState) => state.notification.transaction || [];

/* TODO add some generic "require" helper? */
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
