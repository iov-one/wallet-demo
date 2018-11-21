import { BcpCoin } from "@iov/bcp-types";

export interface PendingNotificationItemProps {
  readonly receiver: string;
  readonly amount: BcpCoin;
}

export interface TransNotificationProps {
  readonly received: string;
  readonly sender: string;
  readonly receiver: string;
  readonly amount: BcpCoin;
  readonly time: string;
  readonly success: boolean;
}

export interface NotificationState {
  readonly pending: ReadonlyArray<PendingNotificationItemProps>;
  readonly transaction: ReadonlyArray<TransNotificationProps>;
}
