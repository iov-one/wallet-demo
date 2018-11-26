import { PendingNotificationItemProps, TransNotificationProps } from "./state";

import { createSyncAction } from "../helpers";

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

export const pendingTransactionVisited = createSyncAction("PENDING_TRANSACTION_VISITED", () => {});

export const setTransactionErrorAction = createSyncAction("SET_TRANSACTION_ERROR", (error: string) => error);
