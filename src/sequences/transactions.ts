import { ChainId } from "@iov/base-types";
import { Amount } from "@iov/bcp-types";

import { checkBnsBlockchainNft, resolveAddress, sendTransaction, setName, waitForCommit } from "~/logic";
import { RootState } from "~/reducers";
import { getUsernameNftByUsernameAsyncAction } from "~/reducers/blockchain";
import { fixTypes } from "~/reducers/helpers";
import { getActiveChainAddresses, requireBnsChainId, requireBnsConnection, requireSigner } from "~/selectors";
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
  const signer = requireSigner(getState());
  const bnsId = requireBnsChainId(getState());
  const bnsConn = requireBnsConnection(getState());
  const addresses = getActiveChainAddresses(getState());

  // make sure all chains are registered and register if not their
  // TODO mid-term we need a better way than auto-registering... eg. actually using bns better
  // but for now this will work
  const blockchainsExist = addresses.map(({ chainId }) =>
    checkBnsBlockchainNft(bnsConn, signer, chainId, "bns"),
  );
  await Promise.all(blockchainsExist);

  // this now sets the name on the bns chain
  await waitForCommit(setName(signer, bnsId, username, addresses));

  // since we are not watching the username (TODO in iov-core), we need to query it again one this is set

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
    const signer = requireSigner(getState());
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
