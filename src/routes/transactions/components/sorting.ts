import { ProcessedTx } from "~/store/notifications/state";

export interface SortingStateProps {
  readonly onSort: (orderBy: TxsOrder, order: SortOrder) => () => void;
  readonly orderBy: TxsOrder;
  readonly order: SortOrder;
}

export const ORDER_ASC = 1;
export const ORDER_DESC = -1;
export type SortOrder = 1 | -1;

export const TX_AMOUNT_COLUMN = "Amount";
export const TX_DATE_COLUMN = "Date";
export type TxsOrder = "Date";

export const filterTxsBy = (
  txs: ReadonlyArray<ProcessedTx>,
  rowsPerPage: number,
  pageNumber: number,
  orderBy: TxsOrder,
  order: SortOrder,
): ReadonlyArray<ProcessedTx> => {
  const orderedTxs = txs.slice(0).sort((a: ProcessedTx | undefined, b: ProcessedTx | undefined) => {
    if (!a || !b) {
      return 0;
    }

    if (orderBy === TX_DATE_COLUMN) {
      return (a.time < b.time ? -1 : a.time > b.time ? 1 : 0) * order;
    }

    return 0;
  });

  const pageStartIdx = pageNumber * rowsPerPage;
  const pageEndIdx = Math.min(txs.length, pageStartIdx + rowsPerPage);
  const txsToRender = orderedTxs.slice(pageStartIdx, pageEndIdx);

  return txsToRender;
};

export const calculateOppositeOrder = (order: SortOrder): SortOrder => {
  return (order * -1) as SortOrder;
};
