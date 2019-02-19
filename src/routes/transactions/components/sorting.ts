import { Item } from "~/components/forms/SelectField";
import { ColumnName } from "./rowTransactionsBuilder";

export interface SortingStateProps {
  readonly sortingState: SortingState;
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
  readonly column: ColumnName;
  readonly order: SortOrder;
}