import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore, Middleware, Store } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import thunk from "redux-thunk";
import { createRootReducer, RootState } from "~/reducers";

export let history = createBrowserHistory();

const middlewares: ReadonlyArray<Middleware> = [
  /* scopeTie, */ thunk,
  promiseMiddleware(),
  routerMiddleware(history),
];

const composeEnhancers =
  (typeof window === "object" && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const makeStore = () =>
  createStore(createRootReducer(history), composeEnhancers(applyMiddleware(...middlewares)));

/**
 * This method can only be used in test enviromnets
 * @param localState Initial redux object
 */
export const aNewStore = (localState?: object): Store<RootState> =>
  createStore(createRootReducer(history), localState, composeEnhancers(applyMiddleware(...middlewares)));

/**
 * This method can only be used in test enviromnets
 */
export const resetHistory = () => {
  history = createBrowserHistory();
};
