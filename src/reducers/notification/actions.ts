import { ConfirmedTransaction, TxCodec, BcpConnection } from "@iov/bcp-types";

import { PendingNotificationItemProps, TransNotificationProps } from "./state";

import { createSyncAction } from "../helpers";

import { watchTransaction, Unsubscriber } from "../../logic";
import { PublicIdentity } from "@iov/keycontrol";

export const addTransactionAction = createSyncAction(
  "ADD_TRANSACTION",
  (transactionItem: TransNotificationProps) => transactionItem,
);

export const addPendingTransactionAction = createSyncAction(
  "ADD_PENDING_TRANSACTION",
  (pendingItem: PendingNotificationItemProps) => pendingItem,
);

export const removePendingTransactionAction = createSyncAction(
  "REMOVE_PENDING_TRANSACTION",
  (pendingId: string) => pendingId,
);

export const addConfirmedTransaction = createSyncAction(
  "ADD_CONFIRMED_TRANSACTION",
  (transaction?: ConfirmedTransaction) => transaction,
);

export const pendingTransactionVisited = createSyncAction("PENDING_TRANSACTION_VISITED", () => true);

export const setTransactionErrorAction = createSyncAction("SET_TRANSACTION_ERROR", (error: string) => error);

function watchTransactionFunction(
  connection: BcpConnection,
  ident: PublicIdentity,
  cb: (transaction?: ConfirmedTransaction, err?: any) => any,
  codec?: TxCodec,
): Unsubscriber {
  return watchTransaction(connection, ident, cb, codec);
}

export const watchTransactionAction = createSyncAction("WATCH_TRANSACTION", watchTransactionFunction);
