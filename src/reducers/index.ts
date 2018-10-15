import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";

import { BlockchainActions, blockchainReducer } from "./blockchain";
import { ProfileActions, profileReducer } from "./profile";

const rootReducer = combineReducers({
  blockchain: blockchainReducer,
  profile: profileReducer,
});

export type RootActions = BlockchainActions | ProfileActions;
export type RootState = StateType<typeof rootReducer>;

export default rootReducer;
