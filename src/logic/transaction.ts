import { PublicKeyBundle } from "@iov/base-types";
import {
  BcpConnection,
  ConfirmedTransaction,
  SendTx,
  TransactionKind,
  UnsignedTransaction,
} from "@iov/bcp-types";
import { BnsConnection } from "@iov/bns";
import { PublicIdentity } from "@iov/keycontrol";
import { ReadonlyDate } from "readonly-date";

// import { getAccount, getAccountByAddress, keyToAddress } from "./account";

export interface TransNotificationInfo<T extends UnsignedTransaction = SendTx>
  extends ConfirmedTransaction<T> {
  readonly received: boolean;
  readonly time: ReadonlyDate;
  readonly success: boolean;
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
): Promise<TransNotificationInfo> => {
  const payload = trans.transaction;
  if (payload.kind !== TransactionKind.Send) {
    throw new Error(`Only handle SendTx for now, got ${payload.kind}`);
  }
  const received = keysEqual(trans.primarySignature.pubkey, identity.pubkey);
  // TODO: fix this, we cannot always assume BnsConnection
  const header = await (conn as BnsConnection).getHeader(trans.height);
  const time = header.time;
  // TODO: lookup value names
  return {
    ...(trans as ConfirmedTransaction<SendTx>),
    received,
    time,
    success: true,
  };
};
