import { setNameSequence } from "~/sequences";

// COMMENT: note you can also use typeof to do so.... but that would require naming the function before export default
export type SetNameType = (name: string) => Promise<void>;

export default (name: string) => (dispatch: any) => dispatch(setNameSequence(name));
