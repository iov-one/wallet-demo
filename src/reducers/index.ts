import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";

import { BlockchainActions, blockchainReducer } from "./blockchain";
import { NotificationActions, notificationReducer } from "./notification";
import { ProfileActions, profileReducer } from "./profile";

const rootReducer = combineReducers({
  blockchain: blockchainReducer,
  notification: notificationReducer,
  profile: profileReducer,
});

export type RootActions = BlockchainActions | ProfileActions | NotificationActions;
export type RootState = StateType<typeof rootReducer>;

export default rootReducer;
