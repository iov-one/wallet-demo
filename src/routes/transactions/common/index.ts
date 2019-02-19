import { Item } from "~/components/forms/SelectField";
import { isIovAddress } from "~/logic";
import { ProcessedTx } from "~/store/notifications/state";
import fromAddress from "../assets/fromAddress.svg";
import toAddress from "../assets/toAddress.svg";
import toAddressRejected from "../assets/toAddressRejected.svg";

export enum ColumnName {
  Date = "Date",
  Amount = "Amount",
}

export enum SortOrder {
  ASC = 1,
  DESC = -1,
}

export interface SortItem extends Item {
  readonly column: ColumnName;
  readonly order: SortOrder;
}

export interface SortingState {
  // tslint:disable-next-line:readonly-keyword
  [index: string]: SortOrder;
}

export interface TransactionRowProps {
  readonly tx: ProcessedTx;
}

export interface TransactionsTableState {
  readonly phoneHook: HTMLDivElement | null;
}

export interface SortingStateProps {
  readonly sortingState: SortingState;
}

export interface TransactionTableProps extends SortingStateProps {
  readonly txs: ReadonlyArray<ProcessedTx>;
  readonly onChangeRows: (item: Item) => void;
  readonly onPrevPage: () => void;
  readonly onNextPage: () => void;
}

export function getTypeIcon(tx: ProcessedTx): string {
  if (tx.received) {
    return fromAddress;
  } else if (!tx.success) {
    return toAddressRejected;
  } else {
    return toAddress;
  }
};

export function getAddressPrefix(tx: ProcessedTx): string {
  if (tx.received) {
    return "From";
  } else {
    return "To";
  }
};

export function calculateSender(senderAddress: string): string {
  if (isIovAddress(senderAddress)) {
    return senderAddress;
  }

  return "blockchain address";
};
