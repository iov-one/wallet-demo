import { loadOrCreateProfile } from "../../logic";
import { createPromiseAction } from "../helpers";

export const createProfileAsyncAction = createPromiseAction(
  "CREATE_PROFILE",
  "CREATE_PROFILE_PENDING",
  "CREATE_PROFILE_FULFILLED",
  "CREATE_PROFILE_REJECTED",
)(loadOrCreateProfile);
