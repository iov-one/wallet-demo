import { AnnotatedConfirmedTransaction, watchTransaction } from "~/logic";
import { createSyncAction } from "~/reducers/helpers";
import { FailedTxPayload, PendingTxPayload } from "./state";

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

export const addFailedTransactionAction = createSyncAction(
  "ADD_FAILED_TRANSACTION",
  (transaction: FailedTxPayload) => transaction,
);

export const watchTransactionAction = createSyncAction("WATCH_TRANSACTION", watchTransaction);
