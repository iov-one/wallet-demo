import { filter } from "lodash";
import { ReadonlyDate } from "readonly-date";
import { ActionType } from "typesafe-actions";

import { AnnotatedConfirmedTransaction, prettyAmount } from "~/logic";
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
    transactionId,
  } = full;
  const amount = prettyAmount(transaction.amount);

  const signer = signerName || signerAddr;
  const recipient = recipientName || recipientAddr;

  return {
    id: transactionId,
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

  const amountCoin = prettyAmount(amount);

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
    case "ADD_FAILED_TRANSACTION":
      const { amount, err } = action.payload;
      if (err) {
        // TODO: better reporting in the UI?
        console.log(`Transaction Error: ${err}`);
      }
      const notification: NotificationTx = {
        ...action.payload,
        amount: prettyAmount(amount),
        time: new ReadonlyDate(),
        signer: "", // this is always us, should we put real data here???
        received: false,
        success: false,
      };
      return {
        ...state,
        transaction: [notification, ...state.transaction],
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
