import { AnnotatedConfirmedTransaction } from "~/logic";
import { createSyncAction } from "~/reducers/helpers";
import { Tx } from "./state";

export const addPendingTransactionAction = createSyncAction(
  "ADD_PENDING_TRANSACTION",
  (pendingItem: Tx) => pendingItem,
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
  (transaction: Tx, err: any) => ({ transaction, err }),
);
