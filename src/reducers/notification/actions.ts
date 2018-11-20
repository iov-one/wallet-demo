import {
  PendingNotificationItemProps,
  TransNotificationProps,
} from "../../components/subComponents/notification";

import { createSyncAction } from "../helpers";

export const addTransactionAction = createSyncAction(
  "ADD_TRANSACTION",
  (transactionItem: TransNotificationProps) => transactionItem,
);

export const addPendingTransactionAction = createSyncAction(
  "ADD_PENDING_TRANSACTION",
  (pendingItem: PendingNotificationItemProps) => pendingItem,
);
