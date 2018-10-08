// import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { CounterActions, counterReducer, CounterState } from "./counter";

export interface RootState {
  readonly counter: CounterState;
}

export type RootActions = CounterActions;

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers<RootState, RootActions>({
  counter: counterReducer,
});

const persistStore = persistReducer(persistConfig, rootReducer);

export default persistStore;
