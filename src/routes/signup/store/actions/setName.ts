import { ChainId } from "@iov/core";
import { setNameSequence } from "~/sequences";

export type SetNameType = (name: string, chainId: ChainId) => Promise<void>

export default (name: string, chainId: ChainId) => (dispatch: any) =>
  dispatch(setNameSequence(name, chainId));
