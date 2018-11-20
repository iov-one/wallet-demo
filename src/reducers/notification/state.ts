import {
  PendingTransactionProps,
  TransactionNotificationProps,
} from "../../components/compoundComponents/notifications";

export interface NotificationState {
  readonly pending: PendingTransactionProps;
  readonly transaction: TransactionNotificationProps;
}
