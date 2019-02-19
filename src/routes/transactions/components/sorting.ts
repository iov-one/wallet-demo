import { Item } from "~/components/forms/SelectField";
import { ColumnName } from "./rowTransactionsBuilder";

export interface SortingStateProps {
  readonly sortingState: SortingState;
  readonly onSort: (orderBy: ColumnName, order: SortOrder) => () => void;
}

export interface SortingState {
  // tslint:disable-next-line:readonly-keyword
  [index: string]: SortOrder;
}

export enum SortOrder {
  ASC = 1,
  DESC = -1,
}

export interface SortItem extends Item {
  readonly orderBy: ColumnName;
  readonly order: SortOrder;
}
