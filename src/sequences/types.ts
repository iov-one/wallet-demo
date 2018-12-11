import { ThunkDispatch } from "redux-thunk";

import { RootActions, RootState } from "../reducers";

export type RootThunkDispatch = ThunkDispatch<RootState, any, RootActions>;
