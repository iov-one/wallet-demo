import { createSelector, createStructuredSelector, Selector } from "reselect";

import { RootState } from "~/reducers";
import { getPendingTransactions, getTransactions } from "~/store/notifications/selectors";
import { ProcessedTx, Tx } from "~/store/notifications/state";

export interface SelectorProps {
  readonly pendingTxs: ReadonlyArray<Tx>;
  readonly txs: ReadonlyArray<ProcessedTx>;
  readonly lastTx: ProcessedTx | undefined;
}

export const confirmedTxSelector = createSelector(
  getTransactions,
  (txs: ReadonlyArray<ProcessedTx>) => {
    const min = Math.min(txs.length, 3);

    return txs.slice(0, min);
  },
);

export const lastTxSelector = createSelector(
  confirmedTxSelector,
  (txs: ReadonlyArray<ProcessedTx>) => {
    if (txs.length === 0) {
      return undefined;
    }

    return txs[0];
  },
);

const structuredSelector: Selector<RootState, SelectorProps> = createStructuredSelector({
  pendingTxs: getPendingTransactions,
  txs: confirmedTxSelector,
  lastTx: lastTxSelector,
});

export default structuredSelector;
