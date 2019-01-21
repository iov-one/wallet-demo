import { Address, BcpAccount, BcpConnection, BcpTicker, TokenTicker, TxCodec } from "@iov/bcp-types";
import { BnsUsernameNft } from "@iov/bns";
import { ChainId, MultiChainSigner } from "@iov/core";
import { ChainTicker } from "~/selectors";

export interface BlockchainState {
  readonly internal: InternalDetails;
  // this is the main chain use for lookups, we must know which is which
  readonly bnsId?: ChainId;
  readonly accountInfo: ReadonlyArray<AccountInfo>;
  readonly tickers: ReadonlyArray<ChainTicker>;
}

export interface AccountInfo {
  readonly chainId: ChainId;
  readonly address: Address;
  readonly account?: BcpAccount;
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

export function getTickerByChain(
  tickers: ReadonlyArray<ChainTicker>,
  chainId: ChainId,
): ReadonlyArray<BcpTicker> {
  return tickers.filter(t => t.chainId === chainId).map(t => t.ticker);
}

export function getChainByTicker(
  tickers: ReadonlyArray<ChainTicker>,
  ticker: TokenTicker,
): ChainId | undefined {
  const result = tickers.find(t => t.ticker.tokenTicker === ticker);
  return result ? result.chainId : undefined;
}

export interface InternalDetails {
  readonly signer?: MultiChainSigner;
  readonly connections: {
    readonly [chainId: string]: BcpConnection;
  };
  readonly codecs: {
    readonly [chainId: string]: TxCodec;
  };
}
