import { createSyncAction } from "~/reducers/helpers";
import { shutdownSequence } from "~/sequences/boot";

export const logoutAction = createSyncAction("LOGOUT", () => undefined);

export const logoutSyncAction = () => async (dispatch: any): Promise<void> => {
  await dispatch(shutdownSequence);

  return dispatch(logoutAction());
};
