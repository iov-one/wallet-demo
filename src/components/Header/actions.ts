import logoutProfileSyncAction, { LogoutProfileType } from "./store/actions/logoutProfile";

export interface LogoutProfileActions {
  readonly logoutProfile: LogoutProfileType;
}

export default {
  logoutProfile: logoutProfileSyncAction,
};
