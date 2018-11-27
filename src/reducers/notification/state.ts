import { FungibleToken } from "@iov/bcp-types";
import { TransNotificationInfo } from "../../logic";

export interface PendingNotificationItemProps {
  readonly id: string;
  readonly receiver: string;
  readonly amount: FungibleToken;
}

export interface NotificationState {
  readonly pending: ReadonlyArray<PendingNotificationItemProps>;
  readonly transaction: ReadonlyArray<TransNotificationInfo>;
  readonly visitedPending: boolean;
  readonly transactionError?: string;
}
