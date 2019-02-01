import { logoutProfileSyncAction } from "~/reducers/profile";

// COMMENT: note you can also use typeof to do so.... but that would require naming the function before export default
export type LogoutProfileType = () => Promise<void>;

export default (dispatch: any) => dispatch(logoutProfileSyncAction());
