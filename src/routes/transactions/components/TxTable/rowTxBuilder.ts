import { Item } from "~/components/forms/SelectField";
import { isIovAddress } from "~/logic";
import { ProcessedTx } from "~/store/notifications/state";
import fromAddress from "../../assets/fromAddress.svg";
import toAddress from "../../assets/toAddress.svg";
import toAddressRejected from "../../assets/toAddressRejected.svg";
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

export function calculateSender(senderAddress: string): string {
  if (isIovAddress(senderAddress)) {
    return senderAddress;
  }

  return "blockchain address";
}
