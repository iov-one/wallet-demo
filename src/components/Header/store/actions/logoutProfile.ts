import { logoutProfileSyncAction } from "~/reducers/profile";

export type LogoutProfileType = () => Promise<void>;

export default (dispatch: any) => dispatch(logoutProfileSyncAction());
