// import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { combineReducers } from "redux";

import { CounterActions, counterReducer, CounterState } from "./counter";

export interface RootState {
  readonly counter: CounterState;
}

export type RootActions = CounterActions;

const rootReducer = combineReducers<RootState, RootActions>({
  counter: counterReducer,
});

export default rootReducer;
