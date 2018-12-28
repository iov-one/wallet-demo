import { connectRouter } from "connected-react-router";
import { History } from "history";
import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";

import { BlockchainActions, blockchainReducer } from "./blockchain";
import { NotificationActions, notificationReducer, NotificationTx } from "./notification";
import { ProfileActions, profileReducer } from "./profile";

export type NotificationTx = NotificationTx;

export const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    blockchain: blockchainReducer,
    notification: notificationReducer,
    profile: profileReducer,
  });

export type RootActions = BlockchainActions | ProfileActions | NotificationActions;
export type RootState = StateType<ReturnType<typeof createRootReducer>>;
