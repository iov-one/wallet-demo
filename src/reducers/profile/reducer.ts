import { ActionType } from "typesafe-actions";

import { createDb } from "../../logic";
import * as actions from "./actions";
import { ProfileState } from "./state";

export const DB_PROFILE_NAME = "profile"
export type ProfileActions = ActionType<typeof actions>;
const initState: ProfileState = {
  internal: {
    db: createDb(DB_PROFILE_NAME),
  },
};

export function profileReducer(state: ProfileState = initState, action: ProfileActions): ProfileState {
  switch (action.type) {
    // example of promise resolution
    case "CREATE_PROFILE_FULFILLED":
      return { ...state, internal: { ...state.internal, profile: action.payload } };
    // example of synchronous function
    case "GET_ACTIVE_IDENTITY":
      return { ...state, activeIdentity: action.payload };
    default:
      return state;
  }
}
