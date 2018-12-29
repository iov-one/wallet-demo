import { connectRouter } from "connected-react-router";
import { History } from "history";
import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";
import { NotificationActions, notificationReducer } from "~/store/notifications/reducer";
import { BlockchainActions, blockchainReducer } from "./blockchain";
import { ProfileActions, profileReducer } from "./profile";

export const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    blockchain: blockchainReducer,
    notification: notificationReducer,
    profile: profileReducer,
  });

export type RootActions = BlockchainActions | ProfileActions | NotificationActions;
export type RootState = StateType<ReturnType<typeof createRootReducer>>;
