import { ActionType } from "typesafe-actions";

import { createDb } from "../../logic";
import * as actions from "./actions";
import { ProfileState } from "./state";

export type ProfileActions = ActionType<typeof actions>;
const initState: ProfileState = {
  internal: {
    db: createDb("profile"),
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
