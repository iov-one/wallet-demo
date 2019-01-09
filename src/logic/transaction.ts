import { PublicKeyBundle } from "@iov/base-types";
import { BcpConnection, ConfirmedTransaction, SendTransaction, UnsignedTransaction } from "@iov/bcp-types";
import { BnsConnection } from "@iov/bns";
import { PublicIdentity } from "@iov/keycontrol";
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
  conn: BcpConnection,
  trans: ConfirmedTransaction,
  identity: PublicIdentity,
): Promise<AnnotatedConfirmedTransaction | undefined> => {
  if (trans.transaction.kind !== "bcp/send") {
    console.log(`Only handle SendTransaction for now, got ${trans.transaction.kind}`);
    return undefined;
  }
  const payload = trans.transaction as SendTransaction;
  const received = !keysEqual(trans.primarySignature.pubkey, identity.pubkey);
  // TODO: fix this, we cannot always assume BnsConnection
  const header = await (conn as BnsConnection).getBlockHeader(trans.height);
  const time = header.time;
  // set addresses and lookup value names
  const recipientAddr = payload.recipient;
  const recipientName = await getNameByAddress(conn, recipientAddr);
  const signerAddr = keyToAddress(trans.primarySignature);
  const signerName = await getNameByAddress(conn, signerAddr);
  return {
    ...(trans as ConfirmedTransaction<SendTransaction>),
    received,
    time,
    success: true,
    recipientAddr,
    recipientName,
    signerAddr,
    signerName,
  };
};
