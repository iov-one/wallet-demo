import { createSelector, createStructuredSelector, Selector } from "reselect";

import { NotificationTx, RootState } from "~/reducers";
import { PendingTx } from "~/reducers/notification";
import { getPendingTransactions, getTransactions } from "~/selectors";

export type HeaderTxProps = NotificationTx;
export type HeaderPendingTxProps = PendingTx;

export interface SelectorProps {
  readonly pendingTxs: ReadonlyArray<HeaderPendingTxProps>;
  readonly txs: ReadonlyArray<HeaderTxProps>;
  readonly lastTx: HeaderTxProps | undefined;
}

const confirmedTxSelector = createSelector(
  getTransactions,
  (txs: ReadonlyArray<HeaderTxProps>) => {
    const min = Math.min(txs.length, 3);

    return txs.slice(0, min)
  }
);

const lastTxSelector = createSelector(
  confirmedTxSelector,
  (txs: ReadonlyArray<HeaderTxProps>) => {
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
