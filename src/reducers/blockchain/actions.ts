import { BcpAccount, BcpConnection, BcpTicker, PublicIdentity, TxCodec } from "@iov/bcp-types";
import { ChainId, MultiChainSigner } from "@iov/core";
import { UserProfile } from "@iov/keycontrol";

import {
  addBlockchain,
  getAccount,
  getUsernameNftByChainAddress,
  getUsernameNftByUsername,
  Unsubscriber,
  watchAccount,
} from "~/logic";
import { createPromiseAction, createSyncAction } from "../helpers";
import { AccountInfo } from "./state";

export const setBnsChainId = createSyncAction("SET_BNS_CHAIN_ID", (bns: ChainId) => bns);

export const setChainIds = createSyncAction("SET_CHAIN_IDS", (chains: ReadonlyArray<ChainId>) => chains);

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

export const getTickersAsyncAction = createPromiseAction(
  "GET_TICKERS",
  "GET_TICKERS_PENDING",
  "GET_TICKERS_FULFILLED",
  "GET_TICKERS_REJECTED",
)(getTickers);

export interface TickerInfo {
  readonly chainId: ChainId;
  readonly tickers: ReadonlyArray<BcpTicker>;
}

async function getTickers(connection: BcpConnection): Promise<TickerInfo> {
  const chainId = connection.chainId();
  const tickers = await connection.getAllTickers();
  return { chainId, tickers };
}

export interface BcpAccountWithChain {
  readonly account: BcpAccount;
  readonly chainId: ChainId;
}

// simple extension of logic function to return data more suited to redux
const getAccountWithChain = async (
  connection: BcpConnection,
  ident: PublicIdentity,
  codec: TxCodec,
): Promise<AccountInfo> => {
  const account = await getAccount(connection, ident, codec);
  const chainId = connection.chainId();
  const address = codec.identityToAddress(ident);
  return {
    chainId,
    address,
    account,
    // username always unset here... add later
  };
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
  codec: TxCodec,
): Unsubscriber {
  const chainId = connection.chainId();
  const wrapped = (account?: BcpAccount, err?: any) =>
    account ? cb({ account, chainId }) : cb(undefined, err);
  return watchAccount(connection, ident, wrapped, codec);
}

export const watchAccountAction = createSyncAction("WATCH_ACCOUNT", watchAccountWithChain);
// TODO: add unwatch to stop it

export const getUsernameNftByUsernameAsyncAction = createPromiseAction(
  "GET_USERNAME",
  "GET_USERNAME_PENDING",
  "GET_USERNAME_FULFILLED",
  "GET_USERNAME_REJECTED",
)(getUsernameNftByUsername);

export const getUsernameNftByChainAddressAsyncAction = createPromiseAction(
  "GET_USERNAME_BY_ADDRESS",
  "GET_USERNAME_BY_ADDRESS_PENDING",
  "GET_USERNAME_BY_ADDRESS_FULFILLED",
  "GET_USERNAME_BY_ADDRESS_REJECTED",
)(getUsernameNftByChainAddress);
