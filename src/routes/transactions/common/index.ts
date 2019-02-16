import { Item } from "~/components/forms/SelectField";
import fromAddress from "../assets/fromAddress.svg";
import toAddress from "../assets/toAddress.svg";
import toAddressRejected from "../assets/toAddressRejected.svg";

export type txType = "send" | "receive" | "reject";

export interface TransactionRowProps {
  readonly type: txType;
  readonly address: string;
  readonly amount: string;
  readonly symbol: string;
  readonly time: Date;
  readonly note: string;
}

export interface TransactionsTableState {
  readonly phoneHook: HTMLDivElement | null;
}

export interface TransactionTableProps {
  readonly onChangeRows: (item: Item) => void;
}

export const getTypeIcon = (type: txType): string => {
  switch (type) {
    case "send":
      return toAddress;
    case "reject":
      return toAddressRejected;
    case "receive":
      return fromAddress;
  }
};

export const getAddressPrefix = (type: txType): string => {
  switch (type) {
    case "send":
      return "To";
    case "reject":
      return "To";
    case "receive":
      return "From";
  }
};
