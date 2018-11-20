import { ActionType } from "typesafe-actions";

import * as actions from "./actions";
import { NotificationState } from "./state";

export type NotificationActions = ActionType<typeof actions>;
const initState: NotificationState = {
  pending: { items: [] },
  transaction: { items: [] },
};

export function notificationReducer(
  state: NotificationState = initState,
  action: NotificationActions,
): NotificationState {
  switch (action.type) {
    default:
      return state;
  }
}
