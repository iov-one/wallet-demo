import { filter } from "lodash";
import { ActionType } from "typesafe-actions";

import { AnnotatedConfirmedTransaction, coinToString } from "~/logic";
import { elipsify } from "~/utils/strings";

import * as actions from "./actions";
import { NotificationState, NotificationTx, PendingTx, PendingTxPayload } from "./state";

export type NotificationActions = ActionType<typeof actions>;
const initState: NotificationState = {
  pending: [],
  transaction: [],
  transactionError: "",
};

// turns the full transaction information into a simple form as needed for display
function simplifyTransaction(full: AnnotatedConfirmedTransaction): NotificationTx {
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
  } = full;
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
}

// formats the pending tx info into a format for display
function simplifyPending(tx: PendingTxPayload): PendingTx {
  const { amount, receiver, id } = tx;
  const { fractional, whole, tokenTicker } = amount;

  // TODO review sigFigs based on iov-core 0.10
  const coin = coinToString({ fractional, whole, sigFigs: 9 });
  const amountCoin = `${coin} ${tokenTicker}`;

  return {
    receiver: elipsify(receiver, 16),
    amount: amountCoin,
    id,
  };
}

export function notificationReducer(
  state: NotificationState = initState,
  action: NotificationActions,
): NotificationState {
  switch (action.type) {
    case "ADD_PENDING_TRANSACTION":
      return {
        ...state,
        pending: [simplifyPending(action.payload), ...state.pending],
      };
    case "REMOVE_PENDING_TRANSACTION":
      const newPendings = filter(state.pending, pendingItem => pendingItem.id !== action.payload);
      return {
        ...state,
        pending: newPendings,
      };
    case "SET_TRANSACTION_ERROR":
      return {
        ...state,
        transactionError: action.payload,
      };
    case "ADD_CONFIRMED_TRANSACTION":
      if (action.payload) {
        const transaction: ReadonlyArray<any> = [simplifyTransaction(action.payload), ...state.transaction];
        return {
          ...state,
          transaction,
        };
      }
      return {
        ...state,
      };
    default:
      return state;
  }
}
