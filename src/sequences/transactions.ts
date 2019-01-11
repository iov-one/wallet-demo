import { ChainId } from "@iov/base-types";
import { Amount } from "@iov/bcp-types";

import { resolveAddress, sendTransaction, setName, waitForCommit } from "~/logic";
import { RootState } from "~/reducers";
import { getUsernameNftByUsernameAsyncAction } from "~/reducers/blockchain";
import { fixTypes } from "~/reducers/helpers";
import {
  ensure,
  getActiveChainAddresses,
  getBnsChainId,
  getBnsConnection,
  getSigner,
  requireBnsConnection,
} from "~/selectors";
import {
  addPendingTransactionAction,
  removePendingTransactionAction,
  setTransactionErrorAction,
} from "~/store/notifications/actions";

import { RootThunkDispatch } from "./types";

export const setNameSequence = (username: string) => async (
  dispatch: RootThunkDispatch,
  getState: () => RootState,
) => {
  const signer = ensure(getSigner(getState()));
  const bnsId = ensure(getBnsChainId(getState()));
  const addresses = getActiveChainAddresses(getState());
  await waitForCommit(setName(signer, bnsId, username, addresses));
  // TODO: get bnsConn, address
  // since we are not watching the username (TODO in iov-core), we need to query it again one this is set
  const bnsConn = ensure(getBnsConnection(getState()));

  // let's just query for any one that we registered...
  return fixTypes(dispatch(getUsernameNftByUsernameAsyncAction.start(bnsConn, username, {})));
};

export const sendTransactionSequence = (
  chainId: ChainId,
  iovAddress: string,
  amount: Amount,
  memo: string,
  uniqId: string,
) => async (dispatch: RootThunkDispatch, getState: () => RootState) => {
  try {
    const signer = ensure(getSigner(getState()));
    const conn = requireBnsConnection(getState());
    const address = await resolveAddress(conn, iovAddress, chainId);
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
