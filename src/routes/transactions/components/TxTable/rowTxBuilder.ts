import { BnsConnection } from "@iov/bns";
import { Item } from "~/components/forms/SelectField";
import { getUsernameNftByUsername } from "~/logic";
import fromAddress from "~/routes/transactions/assets/fromAddress.svg";
import toAddress from "~/routes/transactions/assets/toAddress.svg";
import toAddressRejected from "~/routes/transactions/assets/toAddressRejected.svg";
import { ProcessedTx } from "~/store/notifications/state";
import { SortingStateProps } from "../sorting";

export interface TxTableRowProps {
  readonly tx: ProcessedTx;
}

export interface TxTableState {
  readonly phoneHook: HTMLDivElement | null;
}

export interface TxTableProps extends SortingStateProps {
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
}

export function getAddressPrefix(tx: ProcessedTx): string {
  if (tx.received) {
    return "From";
  } else {
    return "To";
  }
}

export const DEFAULT_ADDRESS = "blockchain address";

export const calculateSender = async (connection: BnsConnection, senderAddress: string): Promise<string> => {
  const response = await getUsernameNftByUsername(connection, senderAddress);
  const isIovAddress = response !== undefined;

  return isIovAddress ? senderAddress : DEFAULT_ADDRESS;
};
