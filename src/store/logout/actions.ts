import { createSyncAction } from "~/reducers/helpers";

export const logoutSyncAction = createSyncAction("LOGOUT", () => undefined);
