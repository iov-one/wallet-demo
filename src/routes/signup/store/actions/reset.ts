import { resetSequence } from "~/sequences";

export type ResetType = (password: string) => Promise<void>;

export default (password: string) => (dispatch: any) => dispatch(resetSequence(password));
