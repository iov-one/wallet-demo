import { ChainId } from "@iov/base-types";
import { Amount } from "@iov/bcp-types";

import { resolveAddress, sendTransaction, setName } from "../logic";
import { RootState } from "../reducers";
import {
  addPendingTransactionAction,
  removePendingTransactionAction,
  setTransactionErrorAction,
} from "../reducers/notification";
import { requireConnection, requireSigner } from "../selectors";
import { RootThunkDispatch } from "./types";

export const setNameSequence = (name: string, chainId: ChainId) => async (
  _: RootThunkDispatch,
  getState: () => RootState,
) => {
  const signer = requireSigner(getState());
  await setName(signer, chainId, name);
};

export const sendTransactionSequence = (
  chainId: ChainId,
  iovAddress: string,
  amount: Amount,
  memo: string,
  uniqId: string,
) => async (dispatch: RootThunkDispatch, getState: () => RootState) => {
  try {
    const signer = requireSigner(getState());
    const conn = requireConnection(getState(), chainId);
    const address = await resolveAddress(conn, iovAddress);
    dispatch(
      addPendingTransactionAction({
        id: uniqId,
        amount,
        receiver: iovAddress,
      }),
    );
    await sendTransaction(signer, chainId, address, amount, memo);
    dispatch(removePendingTransactionAction(uniqId));
  } catch (err) {
    dispatch(setTransactionErrorAction(err));
    dispatch(removePendingTransactionAction(uniqId));
  }
};
