import { createSelector, createStructuredSelector, Selector } from "reselect";

import { coinToString } from "~/logic";
import { NotificationTx, RootState } from "~/reducers";
import { PendingNotificationItemProps } from "~/reducers/notification";
import { getPendingTransactions, getTransactions } from "~/selectors";

export interface SelectorProps {
  readonly pendingTxs: ReadonlyArray<HeaderPendingTxProps>;
  readonly txs: ReadonlyArray<HeaderTxProps>;
  readonly lastTx: HeaderTxProps | undefined;
}

export type HeaderTxProps = NotificationTx;

export interface HeaderPendingTxProps {
  readonly id: string;
  readonly receiver: string;
  readonly amount: string;
}

const confirmedTxSelector = createSelector(
  getTransactions,
  (txs: ReadonlyArray<HeaderTxProps>) => txs.slice(0, 3),
);

const lastTxSelector = createSelector(
  getTransactions,
  (txs: ReadonlyArray<HeaderTxProps>) => (txs.length === 0 ? undefined : txs[0]),
);

const pendingTxsSelector = createSelector(
  getPendingTransactions,
  (pendingTxs: ReadonlyArray<PendingNotificationItemProps>) => {
    if (!pendingTxs || pendingTxs.length === 0) {
      return [];
    }

    const headerPendingTxs = pendingTxs.map((tx: PendingNotificationItemProps) => {
      const { amount, receiver, id } = tx;
      const { fractional, whole, tokenTicker } = amount;

      // TODO review sigFigs based on iov-core 0.10
      const coin = coinToString({ fractional, whole, sigFigs: 9 });
      const amountCoin = `${coin} ${tokenTicker}`;

      return {
        receiver,
        amount: amountCoin,
        id,
      };
    });

    return headerPendingTxs;
  },
);

const structuredSelector: Selector<RootState, SelectorProps> = createStructuredSelector({
  pendingTxs: pendingTxsSelector,
  txs: confirmedTxSelector,
  lastTx: lastTxSelector,
});

export default structuredSelector;
