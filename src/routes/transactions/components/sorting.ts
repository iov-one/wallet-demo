import { Item } from "~/components/forms/SelectField";

export interface SortingStateProps {
  readonly sortingState: SortingState;
  readonly onSort: (orderBy: TxsOrder, order: SortOrder) => () => void;
}

export interface SortingState {
  // tslint:disable-next-line:readonly-keyword
  [index: string]: SortOrder;
}

export const ORDER_ASC = 1;
export const ORDER_DESC = -1;
export type SortOrder = 1 | -1;

export const TX_TICKER_COLUMN = "Amount";
export const TX_DATE_COLUMN = "Date";
export type TxsOrder = "Amount" | "Date";

export interface SortItem extends Item {
  readonly orderBy: TxsOrder;
  readonly order: SortOrder;
}
