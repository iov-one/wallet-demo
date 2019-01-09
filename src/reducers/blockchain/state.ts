import { Address, BcpAccount, BcpConnection, BcpTicker } from "@iov/bcp-types";
import { BnsUsernameNft } from "@iov/bns";
import { ChainId, MultiChainSigner } from "@iov/core";

export interface BlockchainState {
  readonly internal: InternalDetails;
  readonly accountInfo: ReadonlyArray<AccountInfo>;
  readonly tickers: TickersByChain;  // TODO: chainByTicker...
}

export interface AccountInfo {
  readonly chainId: ChainId;
  readonly address: Address;
  readonly account?: BcpAccount;
  readonly username?: BnsUsernameNft;
}

export interface TickersByChain {
  readonly [chainId: string]: ReadonlyArray<BcpTicker>;
}

export function getAccountByChainAndAddress(
  accounts: ReadonlyArray<AccountInfo>,
  chainId: ChainId,
  address: Address,
): AccountInfo|undefined {
  return accounts.find(acct => acct.chainId === chainId && acct.address === address);
}

export interface InternalDetails {
  readonly signer?: MultiChainSigner;
  readonly connections: {
    readonly [chainId: string]: BcpConnection;
  };
}
