// import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { applyMiddleware, combineReducers, compose, createStore, Middleware } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import thunk from "redux-thunk";

import { CounterActions, counterReducer, CounterState } from "./counter";

const middlewares: ReadonlyArray<Middleware> = [/* scopeTie, */ thunk, promiseMiddleware()];

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export interface RootState {
  readonly counter: CounterState;
}

export type RootActions = CounterActions;

const rootReducer = combineReducers<RootState, RootActions>({
  counter: counterReducer,
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));

export { store };
