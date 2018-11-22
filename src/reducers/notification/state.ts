import { FungibleToken } from "@iov/bcp-types";

export interface PendingNotificationItemProps {
  readonly id: string;
  readonly receiver: string;
  readonly amount: FungibleToken;
}

export interface TransNotificationProps {
  readonly received: string;
  readonly sender: string;
  readonly receiver: string;
  readonly amount: FungibleToken;
  readonly time: string;
  readonly success: boolean;
}

export interface NotificationState {
  readonly pending: ReadonlyArray<PendingNotificationItemProps>;
  readonly transaction: ReadonlyArray<TransNotificationProps>;
  readonly transactionError?: string;
}
