import { createSelector } from "reselect";

import { BcpAccount, BcpTicker } from "@iov/bcp-types";
import { BnsConnection } from "@iov/bns";
import { Address, ChainId } from "@iov/core";

import { RootState } from "~/reducers";
import { AccountInfo } from "~/reducers/blockchain";

/*** TODO: separate this out into multiple files ****/

export interface ChainAddress {
  readonly chainId: ChainId;
  readonly address: Address;
}

export interface ChainAccount {
  readonly chainId: ChainId;
  readonly account?: BcpAccount;
}

export interface ChainTicker {
  readonly chainId: ChainId;
  readonly ticker: BcpTicker;
}

export const getProfileDB = (state: RootState) => state.profile.internal.db;
export const getProfile = (state: RootState) => state.profile.internal.profile;

export const getSigner = (state: RootState) => state.blockchain.internal.signer;
export const getConnections = (state: RootState) => state.blockchain.internal.connections;
export const getCodecs = (state: RootState) => state.blockchain.internal.codecs;

export const getOrderedChainIds = (state: RootState) => state.blockchain.chains;
export const getBnsChainId = (state: RootState) => state.blockchain.bnsId;
export const getBnsConnection: (state: RootState) => BnsConnection | undefined = createSelector(
  getConnections,
  getBnsChainId,
  (conns, bnsId) => (bnsId ? (conns[bnsId] as BnsConnection) : undefined),
);
// getChainTickers was a map, now the redux state
export const getChainTickers = (state: RootState) => state.blockchain.tickers;

export const getAllIdentities = (state: RootState) => {
  const profile = state.profile.internal.profile;
  return profile === undefined
    ? []
    : profile.wallets.value.map(i => profile.getIdentities(i.id)).reduce((acc, cur) => [...acc, ...cur]);
};

export const getAllAccounts = (state: RootState) => state.blockchain.accountInfo;

export const getBnsAccount: (state: RootState) => AccountInfo | undefined = createSelector(
  getAllAccounts,
  getBnsChainId,
  (accts: ReadonlyArray<AccountInfo>, bnsId?: ChainId) =>
    bnsId ? accts.find(acct => acct.chainId === bnsId) : undefined,
);

export const getChainIds: (state: RootState) => ReadonlyArray<ChainId> = createSelector(
  getAllAccounts,
  accts => accts.map(acct => acct.chainId),
);

export function ensure<T>(maybe: T | undefined, msg: string = "missing required value"): T {
  if (maybe === undefined) {
    throw new Error(msg);
  }
  return maybe;
}

export const requireConnection = (state: RootState, chainId: ChainId) =>
  ensure(getConnections(state)[chainId], `No connection for chain: ${chainId}`);

export const requireBnsConnection = (state: RootState) =>
  ensure(getBnsConnection(state), `No BNS connection set`);

export const requireBnsChainId = (state: RootState) => ensure(getBnsChainId(state), `No BNS chain id set`);

export const requireSigner = (state: RootState) => ensure(getSigner(state), "Signer not yet initialized");
