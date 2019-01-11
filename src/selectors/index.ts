import { createSelector } from "reselect";

import { BcpAccount, BcpTicker } from "@iov/bcp-types";
import { BnsConnection } from "@iov/bns";
import { Address, ChainId, MultiChainSigner } from "@iov/core";
import { LocalIdentity } from "@iov/keycontrol";

import { RootState } from "~/reducers";
import { AccountInfo, getAccountByChainAndAddress } from "~/reducers/blockchain";

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
export const getChainIds: (state: RootState) => ReadonlyArray<ChainId> = createSelector(
  getConnections,
  conns => Object.keys(conns).map(x => x as ChainId),
);

export const getBnsChainId = (state: RootState) => state.blockchain.bnsId;
export const getBnsConnection: (state: RootState) => BnsConnection | undefined = createSelector(
  getConnections,
  getBnsChainId,
  (conns, bnsId) => (bnsId ? (conns[bnsId] as BnsConnection) : undefined),
);
// getChainTickers was a map, now the redux state
export const getChainTickers = (state: RootState) => state.blockchain.tickers;

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

export const getAllAccounts = (state: RootState) => state.blockchain.accountInfo;

// getMyAccounts will return an entry for each activeChainAddress, possibly empty account/username
export const getMyAccounts: (state: RootState) => ReadonlyArray<AccountInfo> = createSelector(
  getAllAccounts,
  getActiveChainAddresses,
  // only show those balances that are includes in the addresses list
  (balances: ReadonlyArray<AccountInfo>, addresses: ReadonlyArray<ChainAddress>) =>
    addresses.map(
      ({ chainId, address }) =>
        getAccountByChainAndAddress(balances, chainId, address) || { chainId, address },
    ),
);

export function ensure<T>(maybe: T | undefined, msg: string = "missing required value"): T {
  if (maybe === undefined) {
    throw new Error(msg);
  }
  return maybe;
}

export const requireActiveIdentity = (state: RootState) =>
  ensure(getActiveIdentity(state), "No identity active");

export const requireConnection = (state: RootState, chainId: ChainId) =>
  ensure(getConnections(state)[chainId], `No connection for chain: ${chainId}`);

export const requireBnsConnection = (state: RootState) =>
  ensure(getBnsConnection(state), `No BNS connection set`);

export const requireBnsChainId = (state: RootState) => ensure(getBnsChainId(state), `No BNS chain id set`);

export const requireSigner = (state: RootState) => ensure(getSigner(state), "Signer not yet initialized");
