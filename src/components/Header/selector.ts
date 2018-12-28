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
  (txs: ReadonlyArray<HeaderTxProps>) => txs.slice(0, 3),
);

const lastTxSelector = createSelector(
  getTransactions,
  (txs: ReadonlyArray<HeaderTxProps>) => (txs.length === 0 ? undefined : txs[0]),
);

const structuredSelector: Selector<RootState, SelectorProps> = createStructuredSelector({
  pendingTxs: getPendingTransactions,
  txs: confirmedTxSelector,
  lastTx: lastTxSelector,
});

export default structuredSelector;
