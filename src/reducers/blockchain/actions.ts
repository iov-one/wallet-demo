import { BcpAccount, BcpConnection, TxCodec } from "@iov/bcp-types";
import { ChainId, MultiChainSigner } from "@iov/core";
import { PublicIdentity, UserProfile } from "@iov/keycontrol";

import { addBlockchain, getAccount, Unsubscriber, watchAccount } from "../../logic";
import { createPromiseAction, createSyncAction } from "../helpers";

export const createSignerAction = createSyncAction(
  "CREATE_SIGNER",
  (profile: UserProfile) => new MultiChainSigner(profile),
);

export const addBlockchainAsyncAction = createPromiseAction(
  "ADD_BLOCKCHAIN",
  "ADD_BLOCKCHAIN_PENDING",
  "ADD_BLOCKCHAIN_FULFILLED",
  "ADD_BLOCKCHAIN_REJECTED",
)(addBlockchain);

// How do we want to get account... need more info....
export interface BcpAccountWithChain {
  readonly account: BcpAccount;
  readonly chainId: ChainId;
}
// simple extension of logic function to return data more suited to redux
const getAccountWithChain = async (
  connection: BcpConnection,
  ident: PublicIdentity,
  codec?: TxCodec,
): Promise<BcpAccountWithChain | undefined> => {
  const account = await getAccount(connection, ident, codec);
  const chainId = connection.chainId();
  return account === undefined ? undefined : { account, chainId };
};

export const getAccountAsyncAction = createPromiseAction(
  "GET_ACCOUNT",
  "GET_ACCOUNT_PENDING",
  "GET_ACCOUNT_FULFILLED",
  "GET_ACCOUNT_REJECTED",
)(getAccountWithChain);

function watchAccountWithChain(
  connection: BcpConnection,
  ident: PublicIdentity,
  cb: (acct?: BcpAccountWithChain, err?: any) => any,
  codec?: TxCodec,
): Unsubscriber {
  const chainId = connection.chainId();
  const wrapped = (account?: BcpAccount, err?: any) =>
    account ? cb({ account, chainId }) : cb(undefined, err);
  return watchAccount(connection, ident, wrapped, codec);
}

export const watchAccountAction = createSyncAction("WATCH_ACCOUNT", watchAccountWithChain);
// TODO: add unwatch to stop it
