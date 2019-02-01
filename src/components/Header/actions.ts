import { logoutSyncAction } from "~/store/logout/actions";

export interface LogoutProfileActions {
  readonly logoutProfile: typeof logoutSyncAction;
}

export default {
  logoutProfile: logoutSyncAction,
};
