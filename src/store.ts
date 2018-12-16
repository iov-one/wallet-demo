import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore, Middleware, Store } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import thunk from "redux-thunk";
import { createRootReducer, RootState } from "./reducers";

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

// used only in tests
export const aNewStore = (localState?: object): Store<RootState> =>
  createStore(createRootReducer(history), localState, composeEnhancers(applyMiddleware(...middlewares)));
