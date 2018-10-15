import { getMainWalletAndIdentity, loadOrCreateProfile } from "../../logic";
import { createPromiseAction, createSyncAction } from "../helpers";

export const createProfileAsyncAction = createPromiseAction(
  "CREATE_PROFILE",
  "CREATE_PROFILE_PENDING",
  "CREATE_PROFILE_SUCCESS",
  "CREATE_PROFILE_REJECTED",
)(loadOrCreateProfile);

export const getIdentityAction = createSyncAction("GET_ACTIVE_IDENTITY", getMainWalletAndIdentity);
