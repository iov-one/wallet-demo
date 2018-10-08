import { ActionType } from "typesafe-actions";

import * as actions from "./actions";
import { CounterState } from "./state";

export type CounterAction = ActionType<typeof actions>;
const initState: CounterState = 1;

export function counterReducer(state: CounterState = initState, action: CounterAction): CounterState {
  switch (action.type) {
    // separate line for each success
    case "INCREMENT_COUNTER":
      return state + 1;
    default:
      return state;
  }
}
