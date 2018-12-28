import { AnnotatedConfirmedTransaction, watchTransaction } from "~/logic";
import { createSyncAction } from "../helpers";
import { PendingTxPayload } from "./state";

export const addPendingTransactionAction = createSyncAction(
  "ADD_PENDING_TRANSACTION",
  (pendingItem: PendingTxPayload) => pendingItem,
);

export const removePendingTransactionAction = createSyncAction(
  "REMOVE_PENDING_TRANSACTION",
  (pendingId: string) => pendingId,
);

export const addConfirmedTransaction = createSyncAction(
  "ADD_CONFIRMED_TRANSACTION",
  (transaction?: AnnotatedConfirmedTransaction) => transaction,
);

export const setTransactionErrorAction = createSyncAction("SET_TRANSACTION_ERROR", (error: string) => error);

export const watchTransactionAction = createSyncAction("WATCH_TRANSACTION", watchTransaction);
