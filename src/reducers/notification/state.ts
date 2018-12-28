import { ReadonlyDate } from "readonly-date";

import { Amount } from "@iov/bcp-types";

export interface PendingNotificationItemProps {
  readonly id: string;
  readonly receiver: string;
  readonly amount: Amount;
}

export interface NotificationTx {
  readonly id: string;
  readonly time: ReadonlyDate;
  readonly received: boolean;
  readonly amount: string;
  readonly signer: string;
  readonly recipient: string;
  readonly success: boolean;
}

export interface NotificationState {
  readonly pending: ReadonlyArray<PendingNotificationItemProps>;
  readonly transaction: ReadonlyArray<NotificationTx>;
  readonly visitedPending: boolean;
  readonly transactionError?: string;
}
