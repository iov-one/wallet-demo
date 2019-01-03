import { Address, BcpAccount, BcpConnection, BcpTicker } from "@iov/bcp-types";
import { ChainId, MultiChainSigner } from "@iov/core";

export interface BlockchainState {
  readonly internal: InternalDetails;
  readonly accounts: AccountsByChainAndAddress;
  readonly tickers: TickersByChain;
}

export interface TickersByChain {
  readonly [chainId: string]: ReadonlyArray<BcpTicker>;
}

export interface AccountsByChainAndAddress {
  readonly [chainId: string]: AccountsByAddress;
}

export interface AccountsByAddress {
  readonly [address: string]: Account;
}

export function getAccountByChainAndAddress(
  accounts: AccountsByChainAndAddress,
  chainId: ChainId,
  address: Address,
): Account {
  const empty = {};
  return !accounts || !accounts[chainId] ? empty : accounts[chainId][address] || empty;
}

export interface Account {
  readonly account?: BcpAccount;
  // readonly nonce: BcpNonce;
  // TODO: transactions?
}

export interface InternalDetails {
  readonly signer?: MultiChainSigner;
  readonly connections: {
    readonly [chainId: string]: BcpConnection;
  };
}
