import { Address, BcpAccount, BcpConnection, BcpTicker, TokenTicker } from "@iov/bcp-types";
import { ChainId, MultiChainSigner } from "@iov/core";

export interface BlockchainState {
  readonly internal: InternalDetails;
  // this is the main chain use for lookups, we must know which is which
  readonly bnsId?: ChainId;
  readonly accountInfo: ReadonlyArray<AccountInfo>;
  readonly tickers: ReadonlyArray<TickerWithChain>;
}

export interface AccountInfo {
  readonly chainId: ChainId;
  readonly address: Address;
  readonly account?: BcpAccount;
  readonly username?: string;
}

export interface TickerWithChain {
  readonly ticker: BcpTicker;
  readonly chainId: ChainId;
}

// TODO: add tests, move file (all functions below)
export function getAccountByChainAndAddress(
  accounts: ReadonlyArray<AccountInfo>,
  chainId: ChainId,
  address: Address,
): AccountInfo | undefined {
  return accounts.find(acct => acct.chainId === chainId && acct.address === address);
}

// returns input accounts with the matching account gone
export function filterAccountByChainAndAddress(
  accounts: ReadonlyArray<AccountInfo>,
  chainId: ChainId,
  address: Address,
): ReadonlyArray<AccountInfo> {
  return accounts.filter(acct => acct.chainId !== chainId || acct.address !== address);
}

export function getTickerByChain(
  tickers: ReadonlyArray<TickerWithChain>,
  chainId: ChainId,
): ReadonlyArray<BcpTicker> {
  return tickers.filter(t => t.chainId === chainId).map(t => t.ticker);
}

export function getChainByTicker(
  tickers: ReadonlyArray<TickerWithChain>,
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
}
