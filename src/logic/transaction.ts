import {
  BcpConnection,
  ChainId,
  ConfirmedTransaction,
  isBlockInfoPending,
  isSendTransaction,
  PostTxResponse,
  PublicIdentity,
  PublicKeyBundle,
  SendTransaction,
  TxCodec,
  UnsignedTransaction,
} from "@iov/bcp-types";
import { BnsConnection } from "@iov/bns";
import { ReadonlyDate } from "readonly-date";

import { getNameByAddress, keyToAddress } from "./account";

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
}

const keysEqual = (a: PublicKeyBundle, b: PublicKeyBundle): boolean =>
  a.algo === b.algo && arraysEqual(a.data, b.data);

const arraysEqual = (a: Uint8Array, b: Uint8Array): boolean => {
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
};

export const parseConfirmedTransaction = async (
  bnsConn: BnsConnection,
  conn: BcpConnection,
  trans: ConfirmedTransaction,
  identity: PublicIdentity,
  codec: TxCodec,
): Promise<AnnotatedConfirmedTransaction | undefined> => {
  const payload = trans.transaction;
  if (!isSendTransaction(payload)) {
    console.log(`Only handle SendTransaction for now, got ${payload.kind}`);
    return undefined;
  }
  const received = !keysEqual(trans.primarySignature.pubkey, identity.pubkey);
  // we get header and time from the chain the tx comes from
  const header = await conn.getBlockHeader(trans.height);
  const time = header.time;
  // we look up names from the bns chain
  const chainId = conn.chainId();
  const recipientAddr = payload.recipient;
  const recipientName = await getNameByAddress(bnsConn, chainId, recipientAddr);
  const ident: PublicIdentity = {
    chainId: chainId,
    pubkey: trans.primarySignature.pubkey as PublicKeyBundle,
  };
  const signerAddr = keyToAddress(ident, codec);
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
  };
};

// this waits for one commit to be writen, then returns the response
export async function waitForCommit(req: Promise<PostTxResponse>): Promise<PostTxResponse> {
  const res = await req;
  await res.blockInfo.waitFor(info => !isBlockInfoPending(info));
  return res;
}
