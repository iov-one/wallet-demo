import { ActionType } from "typesafe-actions";

import { filter, takeRight } from "lodash";

import * as actions from "./actions";
import { NotificationState } from "./state";

export type NotificationActions = ActionType<typeof actions>;
const initState: NotificationState = {
  pending: [],
  transaction: [],
  visitedPending: false,
  transactionError: "",
};

export function notificationReducer(
  state: NotificationState = initState,
  action: NotificationActions,
): NotificationState {
  switch (action.type) {
    case "ADD_PENDING_TRANSACTION":
      const pending: ReadonlyArray<any> = [...state.pending, action.payload];
      return {
        ...state,
        pending,
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
    case "PENDING_TRANSACTION_VISITED":
      return {
        ...state,
        visitedPending: true,
      };
    case "ADD_CONFIRMED_TRANSACTION":
      if (action.payload) {
        const transaction: ReadonlyArray<any> = [...state.transaction, action.payload];
        return {
          ...state,
          transaction: takeRight(transaction, 3),
        };
      }
      return {
        ...state,
      };
    case "RESET_CONFIRMED_TRANSACTION_LIST":
      return {
        ...state,
        transaction: [],
      };
    default:
      return state;
  }
}
