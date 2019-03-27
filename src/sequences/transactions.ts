import { Amount, ChainId } from "@iov/bcp";

import {
  addressToCodec,
  checkBnsBlockchainNft,
  resolveAddress,
  sendTransaction,
  setName,
  waitForCommit,
} from "~/logic";
import { RootState } from "~/reducers";
import { getUsernameNftByUsernameAsyncAction } from "~/reducers/blockchain";
import { fixTypes } from "~/reducers/helpers";
import {
  ensure,
  getAllAccounts,
  getProfile,
  requireBnsChainId,
  requireBnsConnection,
  requireSigner,
} from "~/selectors";
import {
  addFailedTransactionAction,
  addPendingTransactionAction,
  removePendingTransactionAction,
} from "~/store/notifications/actions";

import { createProfile } from "../logic/profile";
import { RootThunkDispatch } from "./types";

export const setNameSequence = (username: string) => async (
  dispatch: RootThunkDispatch,
  getState: () => RootState,
) => {
  const signer = requireSigner(getState());
  const bnsId = requireBnsChainId(getState());
  const bnsConn = requireBnsConnection(getState());
  const addresses = getAllAccounts(getState());
  const profileState = getProfile(getState());
  const profile = profileState === undefined ? await createProfile(bnsId) : profileState;

  // make sure all chains are registered and register if not their
  // TODO mid-term we need a better way than auto-registering... eg. actually using bns better
  // but for now this will work
  for (const { chainId } of addresses) {
    // TODO: this should not be "bns", but rather the codec name...
    await checkBnsBlockchainNft(profile, bnsConn, signer, chainId, "bns");
  }

  // this now sets the name on the bns chain
  await waitForCommit(setName(profile, signer, bnsId, username, addresses));
  // TODO: we don't handle errors here at all!

  // since we are not watching the username (TODO in iov-core), we need to query it again one this is set
  return fixTypes(dispatch(getUsernameNftByUsernameAsyncAction.start(bnsConn, username, {}, {})));
};

export const sendTransactionSequence = (
  chainId: ChainId,
  iovAddress: string,
  amount: Amount,
  memo: string,
  uniqId: string,
  signerName: string,
) => async (dispatch: RootThunkDispatch, getState: () => RootState) => {
  const profile = ensure(getProfile(getState()));
  const signer = requireSigner(getState());
  const conn = requireBnsConnection(getState());
  try {
    const address = await resolveAddress(conn, iovAddress, chainId, addressToCodec(iovAddress));
    dispatch(
      addPendingTransactionAction({
        id: uniqId,
        amount,
        recipient: iovAddress,
        signer: signerName,
      }),
    );
    await waitForCommit(sendTransaction(profile, signer, chainId, address, amount, memo));
  } catch (err) {
    dispatch(
      addFailedTransactionAction(
        {
          id: uniqId,
          amount,
          recipient: iovAddress,
          signer: signerName,
        },
        err,
      ),
    );
  } finally {
    dispatch(removePendingTransactionAction(uniqId));
  }
};
