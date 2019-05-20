import { Account, Address, BlockchainConnection, Token, TokenTicker, TxCodec } from "@iov/bcp";
import { BnsUsernameNft } from "@iov/bns";
import { ChainId, MultiChainSigner } from "@iov/core";
import { ChainToken } from "~/selectors";

export interface BlockchainState {
  readonly internal: InternalDetails;
  // this is the main chain use for lookups, we must know which is which
  readonly bnsId?: ChainId;
  // this is a list of all chain ids in the same order as the config...
  // so we can use that to match to config specs, like faucet, or anything else is a deterministic order
  // (accounts order changes as they are updated)
  // bns should be the first one here
  readonly chains: ReadonlyArray<ChainId>;
  readonly accountInfo: ReadonlyArray<AccountInfo>;
  readonly tickers: ReadonlyArray<ChainToken>;
}

export interface AccountInfo {
  readonly chainId: ChainId;
  readonly address: Address;
  readonly account?: Account;
  readonly username?: string;
}

// copied from @iov/bns as not exported
// TODO: export and remove this duplicate
export interface ChainAddressPair {
  readonly chainId: ChainId;
  readonly address: Address;
}

// TODO: add tests, move file (all functions below)
export function getAccountByChainAndAddress(
  accounts: ReadonlyArray<AccountInfo>,
  chainId: ChainId,
  address: Address,
): AccountInfo | undefined {
  return accounts.find(acct => acct.chainId === chainId && acct.address === address);
}

// returns true if any
export function hasChainAddress(
  accounts: ReadonlyArray<ChainAddressPair>,
  chainId: ChainId,
  address: Address,
): boolean {
  return accounts.find(acct => acct.chainId === chainId && acct.address === address) !== undefined;
}

// returns input accounts with the matching account gone
export function filterAccountByChainAndAddress(
  accounts: ReadonlyArray<AccountInfo>,
  chainId: ChainId,
  address: Address,
): ReadonlyArray<AccountInfo> {
  return accounts.filter(acct => acct.chainId !== chainId || acct.address !== address);
}

// this will unset all username that match first
// then it will set all address/chain pairs that do match
// this handles the case when an address was deregistered as well
export function updateUsernameNft(
  accounts: ReadonlyArray<AccountInfo>,
  nft: BnsUsernameNft,
): ReadonlyArray<AccountInfo> {
  const { id: username, addresses } = nft;
  return accounts
    .map(acct => (acct.username === username ? { ...acct, username: undefined } : acct)) // unset
    .map(acct =>
      hasChainAddress(addresses, acct.chainId, acct.address) ? { ...acct, username: nft.id } : acct,
    ); // set
}

export function getTickerByChain(tokens: ReadonlyArray<ChainToken>, chainId: ChainId): ReadonlyArray<Token> {
  return tokens.filter(t => t.chainId === chainId).map(t => t.token);
}

export function getChainByTicker(
  tokens: ReadonlyArray<ChainToken>,
  ticker: TokenTicker,
): ChainId | undefined {
  const result = tokens.find(t => t.token.tokenTicker === ticker);
  return result ? result.chainId : undefined;
}

export interface InternalDetails {
  readonly signer?: MultiChainSigner;
  readonly connections: {
    readonly [chainId: string]: BlockchainConnection;
  };
  readonly codecs: {
    readonly [chainId: string]: TxCodec;
  };
}
