import { logoutSyncAction } from "~/store/logout/actions";

export interface LogoutProfileActions {
  readonly logoutProfile: (dispatch: any) => Promise<void>;
}

export default {
  logoutProfile: logoutSyncAction,
};
