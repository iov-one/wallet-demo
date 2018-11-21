import { ActionType } from "typesafe-actions";

import * as actions from "./actions";
import { NotificationState } from "./state";

export type NotificationActions = ActionType<typeof actions>;
const initState: NotificationState = {
  pending: [],
  transaction: [],
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
    default:
      return state;
  }
}
