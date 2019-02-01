import logoutProfileSyncAction from "./store/actions/logoutProfile";

export interface LogoutProfileActions {
  readonly logoutProfile: () => Promise<void>;
}

export default {
  logoutProfile: logoutProfileSyncAction,
};
