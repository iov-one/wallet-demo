import { ActionType } from "typesafe-actions";

import { createDb } from "../../logic";
import * as actions from "./actions";
import { ProfileState } from "./state";

export const DB_PROFILE_NAME = "profile";
export type ProfileActions = ActionType<typeof actions>;
const initState = (): ProfileState => ({
  internal: {
    db: createDb(DB_PROFILE_NAME),
  },
});

export function profileReducer(maybeState: ProfileState | undefined, action: ProfileActions): ProfileState {
  // we create it dynamically in the function rather than default argument
  // using a global initState object meant re-using the same database in all tests
  // this has same effect, but allow multiple initializations in one process
  const state = maybeState ? maybeState : initState();

  switch (action.type) {
    case "CREATE_PROFILE_FULFILLED":
      return { ...state, internal: { ...state.internal, profile: action.payload } };
    default:
      return state;
  }
}
