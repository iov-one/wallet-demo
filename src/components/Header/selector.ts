import { ReadonlyDate } from "readonly-date";
import { createSelector, createStructuredSelector, Selector } from "reselect";
import { coinToString, TransNotificationInfo } from "~/logic";
import { RootState } from "~/reducers";
import { PendingNotificationItemProps } from "~/reducers/notification";
import { getPendingTransactions, getTransactions } from "~/selectors";

export interface SelectorProps {
  readonly pendingTxs: ReadonlyArray<HeaderPendingTxProps>;
  readonly txs: ReadonlyArray<HeaderTxProps>;
  readonly lastTx: HeaderTxProps | undefined;
}

export interface HeaderTxProps {
  readonly id: string;
  readonly time: ReadonlyDate;
  readonly received: boolean;
  readonly amount: string;
  readonly signer: string;
  readonly recipient: string;
  readonly success: boolean;
}

export interface HeaderPendingTxProps {
  readonly id: string;
  readonly receiver: string;
  readonly amount: string;
}

const elipsify = (full: string, maxLength: number): string =>
  full.length <= maxLength ? full : full.slice(0, maxLength - 3) + "...";

const txsSelector = createSelector(
  getTransactions,
  (txs: ReadonlyArray<TransNotificationInfo>) => {
    if (!txs || txs.length === 0) {
      return [];
    }
    // tslint:disable-next-line:readonly-array
    const firstTxs = (txs as TransNotificationInfo[]).reverse().slice(0, 3);

    const headerTxs = firstTxs.map((tx: TransNotificationInfo) => {
      const {
        time,
        transaction,
        received,
        signerAddr,
        signerName,
        recipientAddr,
        recipientName,
        success,
        txid,
      } = tx;
      const { fractional, whole, tokenTicker } = transaction.amount;

      // TODO review sigFigs based on iov-core 0.10
      const coin = coinToString({ fractional, whole, sigFigs: 9 });
      const amount = `${coin} ${tokenTicker}`;

      const signer = elipsify(signerName || signerAddr, 16);
      const recipient = elipsify(recipientName || recipientAddr, 16);

      return {
        id: String(txid),
        time,
        received,
        amount,
        signer,
        recipient,
        success,
      };
    });

    return headerTxs;
  },
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

const lastTxSelector = createSelector(
  txsSelector,
  (txs: ReadonlyArray<HeaderTxProps>) => {
    if (txs.length === 0) {
      return undefined;
    }

    return txs[0];
  }
)

const structuredSelector: Selector<RootState, SelectorProps> = createStructuredSelector({
  pendingTxs: pendingTxsSelector,
  txs: txsSelector,
  lastTx: lastTxSelector,
});

export default structuredSelector;
