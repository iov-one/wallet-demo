import { BcpAccount, BcpConnection } from "@iov/bcp-types";
import { MultiChainSigner } from "@iov/core";

export interface BlockchainState {
  readonly internal: InternalDetails;
  readonly accounts: AccountsByChainAndAddress;
}

export interface AccountsByChainAndAddress {
  readonly [chainId: string]: AccountsByAddress;
}

export interface AccountsByAddress {
  readonly [address: string]: Account;
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
