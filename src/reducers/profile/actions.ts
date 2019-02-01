import { loadOrCreateProfile } from "../../logic";
import { createPromiseAction, createSyncAction } from "../helpers";

export const createProfileAsyncAction = createPromiseAction(
  "CREATE_PROFILE",
  "CREATE_PROFILE_PENDING",
  "CREATE_PROFILE_FULFILLED",
  "CREATE_PROFILE_REJECTED",
)(loadOrCreateProfile);

export const logoutProfileSyncAction = createSyncAction("LOGOUT_PROFILE_FULFILLED", () => undefined);
