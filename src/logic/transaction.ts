import {
  BlockchainConnection,
  ChainId,
  ConfirmedTransaction,
  isBlockInfoFailed,
  isBlockInfoPending,
  isSendTransaction,
  PostTxResponse,
  PublicIdentity,
  publicKeyBundleEquals,
  SendTransaction,
  TxCodec,
  UnsignedTransaction,
} from "@iov/bcp";
import { BnsConnection } from "@iov/bns";
import { ReadonlyDate } from "readonly-date";

import { getNameByAddress } from "./account";

export interface AnnotatedConfirmedTransaction<T extends UnsignedTransaction = SendTransaction>
  extends ConfirmedTransaction<T> {
  readonly received: boolean;
  readonly time: ReadonlyDate;
  readonly success: boolean;
  // these are always set to the raw values (TODO: handle multisig)
  readonly signerAddr: string;
  readonly recipientAddr: string;
  // these are set for reverse lookup of valuename
  readonly signerName?: string;
  readonly recipientName?: string;
  readonly chainId: ChainId;
  readonly memo?: string;
}

export const parseConfirmedTransaction = async (
  bnsConn: BnsConnection,
  conn: BlockchainConnection,
  trans: ConfirmedTransaction,
  identity: PublicIdentity,
  codec: TxCodec,
): Promise<AnnotatedConfirmedTransaction | undefined> => {
  const payload = trans.transaction;
  if (!isSendTransaction(payload)) {
    console.log(`Only handle SendTransaction for now, got ${payload.kind}`);
    return undefined;
  }
  const received = !publicKeyBundleEquals(trans.primarySignature.pubkey, identity.pubkey);
  // we get header and time from the chain the tx comes from
  const header = await conn.getBlockHeader(trans.height);
  const time = header.time;
  // we look up names from the bns chain
  const chainId = conn.chainId();
  const recipientAddr = payload.recipient;
  const recipientName = await getNameByAddress(bnsConn, chainId, recipientAddr);
  const creatorPubkey = trans.primarySignature.pubkey;
  const creator: PublicIdentity = {
    chainId: chainId,
    pubkey: creatorPubkey,
  };
  const signerAddr = codec.identityToAddress(creator);
  const signerName = await getNameByAddress(bnsConn, chainId, signerAddr);
  return {
    ...(trans as ConfirmedTransaction<SendTransaction>),
    received,
    time,
    success: true,
    recipientAddr,
    recipientName,
    signerAddr,
    signerName,
    chainId,
    memo: payload.memo,
  };
};

// this waits for one commit to be writen, then returns the response
// if either CheckTx or DeliverTx error, then this will throw an error.
// If it succeeds, we are assured that PostTxResponse.blockInfo.value is of type BlockInfoSucceeded
export async function waitForCommit(req: Promise<PostTxResponse>): Promise<PostTxResponse> {
  // this throws error if the query fails on CheckTx
  const res = await req;
  const info = await res.blockInfo.waitFor(x => !isBlockInfoPending(x));
  if (isBlockInfoFailed(info)) {
    throw new Error(`(${info.code}) ${info.message}`);
  }
  return res;
}
