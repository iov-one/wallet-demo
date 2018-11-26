import { ActionType } from "typesafe-actions";

import { filter } from "lodash";

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
    case "ADD_TRANSACTION":
      return {
        ...state,
        transaction: [...state.transaction, action.payload],
      };
    case "ADD_PENDING_TRANSACTION":
      return {
        ...state,
        pending: [...state.pending, action.payload],
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
    default:
      return state;
  }
}
