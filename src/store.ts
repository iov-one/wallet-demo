import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore, Middleware } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import thunk from "redux-thunk";
import { createRootReducer } from "./reducers";

export const history = createBrowserHistory();

const middlewares: ReadonlyArray<Middleware> = [
  /* scopeTie, */ thunk,
  promiseMiddleware(),
  routerMiddleware(history),
];

const composeEnhancers =
  (typeof window === "object" && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const makeStore = () =>
  createStore(createRootReducer(history), composeEnhancers(applyMiddleware(...middlewares)));
