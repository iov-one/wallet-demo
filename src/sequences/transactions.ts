import { ChainId } from "@iov/base-types";
import { Amount } from "@iov/bcp-types";

import { resolveAddress, sendTransaction, setName, waitForCommit } from "~/logic";
import { RootState } from "~/reducers";
import { requireConnection, requireSigner } from "~/selectors";
import {
  addPendingTransactionAction,
  removePendingTransactionAction,
  setTransactionErrorAction,
} from "~/store/notifications/actions";

import { RootThunkDispatch } from "./types";

export const setNameSequence = (name: string, chainId: ChainId) => async (
  _: RootThunkDispatch,
  getState: () => RootState,
) => {
  const signer = requireSigner(getState());
  await waitForCommit(setName(signer, chainId, name));
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
    await waitForCommit(sendTransaction(signer, chainId, address, amount, memo));
    dispatch(removePendingTransactionAction(uniqId));
  } catch (err) {
    dispatch(setTransactionErrorAction(err));
    dispatch(removePendingTransactionAction(uniqId));
  }
};
