import { TransNotificationInfo, watchTransaction } from "../../logic";
import { createSyncAction } from "../helpers";
import { PendingNotificationItemProps } from "./state";

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
  (transaction?: TransNotificationInfo) => transaction,
);

export const pendingTransactionVisited = createSyncAction("PENDING_TRANSACTION_VISITED", () => true);

export const setTransactionErrorAction = createSyncAction("SET_TRANSACTION_ERROR", (error: string) => error);

export const watchTransactionAction = createSyncAction("WATCH_TRANSACTION", watchTransaction);
