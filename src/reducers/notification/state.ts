import { Amount } from "@iov/bcp-types";
import { TransNotificationInfo } from "../../logic";

export interface PendingNotificationItemProps {
  readonly id: string;
  readonly receiver: string;
  readonly amount: Amount;
}

export interface NotificationState {
  readonly pending: ReadonlyArray<PendingNotificationItemProps>;
  readonly transaction: ReadonlyArray<TransNotificationInfo>;
  readonly visitedPending: boolean;
  readonly transactionError?: string;
}
