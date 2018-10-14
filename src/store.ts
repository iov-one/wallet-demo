// import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { applyMiddleware, compose, createStore, Middleware } from "redux";
import promiseMiddleware from "redux-promise-middleware";
// import thunk from "redux-thunk";

import rootReducer from "./reducers";

const middlewares: ReadonlyArray<Middleware> = [/* scopeTie, */ promiseMiddleware()];
// const middlewares: ReadonlyArray<Middleware> = [/* scopeTie, */ thunk, promiseMiddleware()];

const composeEnhancers =
  (typeof window === "object" && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const makeStore = () => createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));
