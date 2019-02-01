import { logoutProfileSyncAction } from "~/reducers/profile";

export default (): any => async (dispatch: any): Promise<void> => dispatch(logoutProfileSyncAction());
