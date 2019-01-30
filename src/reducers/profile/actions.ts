import { getWalletAndIdentity, loadOrCreateProfile } from "../../logic";
import { createPromiseAction, createSyncAction } from "../helpers";

export const createProfileAsyncAction = createPromiseAction(
  "CREATE_PROFILE",
  "CREATE_PROFILE_PENDING",
  "CREATE_PROFILE_FULFILLED",
  "CREATE_PROFILE_REJECTED",
)(loadOrCreateProfile);

// TODO: what do we do with the concept of "active identity"
export const getIdentityAction = createSyncAction("GET_ACTIVE_IDENTITY", getWalletAndIdentity);
