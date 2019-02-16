import { Item } from "~/components/forms/SelectField";
import { ProcessedTx } from "~/store/notifications/state";
import fromAddress from "../assets/fromAddress.svg";
import toAddress from "../assets/toAddress.svg";
import toAddressRejected from "../assets/toAddressRejected.svg";

export interface TransactionRowProps {
  readonly tx: ProcessedTx;
  /*readonly type: txType;
  readonly address: string;
  readonly amount: string;
  readonly symbol: string;
  readonly time: Date;
  readonly note?: string;*/
}

export interface TransactionsTableState {
  readonly phoneHook: HTMLDivElement | null;
}

export interface TransactionTableProps {
  readonly txs: ReadonlyArray<ProcessedTx>;
  readonly onChangeRows: (item: Item) => void;
}

export const getTypeIcon = (tx: ProcessedTx): string => {
  if (tx.received) {
    return fromAddress;
  } else if (!tx.success) {
    return toAddressRejected;
  } else {
    return toAddress;
  }
};

export const getAddressPrefix = (tx: ProcessedTx): string => {
  if (tx.received) {
    return "From";
  } else {
    return "To";
  }
};
