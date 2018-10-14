import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";

import { BlockchainActions, blockchainReducer } from "./blockchain";
import { CounterActions, counterReducer } from "./counter";
import { ProfileActions, profileReducer } from "./profile";

const rootReducer = combineReducers({
  blockchain: blockchainReducer,
  counter: counterReducer,
  profile: profileReducer,
});

export type RootActions = BlockchainActions | CounterActions | ProfileActions;
export type RootState = StateType<typeof rootReducer>;

export default rootReducer;
