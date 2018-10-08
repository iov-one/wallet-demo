// import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { applyMiddleware, compose, createStore, Middleware } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

const middlewares: ReadonlyArray<Middleware> = [/* scopeTie, */ thunk, promiseMiddleware()];

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));

export { store };
