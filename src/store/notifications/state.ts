import { ReadonlyDate } from "readonly-date";

import { Amount } from "@iov/bcp-types";

// this comes in the action
export interface PendingTxPayload {
  readonly id: string;
  readonly receiver: string;
  readonly amount: Amount;
}

export interface FailedTxPayload {
  readonly id: string;
  readonly recipient: string;
  readonly amount: Amount;
  readonly err?: any;
}

// this is formated and stored in the reducer
export interface PendingTx {
  readonly id: string;
  readonly receiver: string;
  readonly amount: string;
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
  readonly pending: ReadonlyArray<PendingTx>;
  readonly transaction: ReadonlyArray<NotificationTx>;
  readonly transactionError?: string;
}
