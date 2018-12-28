import debounce from "xstream/extra/debounce";

import { BcpConnection, BcpTxQuery, ConfirmedTransaction } from "@iov/bcp-types";
import { bnsFromOrToTag, MultiChainSigner } from "@iov/core";
import { PublicIdentity } from "@iov/keycontrol";

import { addConfirmedTransaction } from "~/store/notifications/actions";

import { BlockchainSpec, keyToAddress, parseConfirmedTransaction, resetProfile } from "../logic";
import { RootState } from "../reducers";
import {
  addBlockchainAsyncAction,
  BcpAccountWithChain,
  createSignerAction,
  getAccountAsyncAction,
  getAccountSyncAction,
} from "../reducers/blockchain";
import { fixTypes } from "../reducers/helpers";
import { createProfileAsyncAction, getIdentityAction } from "../reducers/profile";
import { getProfileDB } from "../selectors";

import { RootThunkDispatch } from "./types";

export const resetSequence = (password: string) => async (
  _: RootThunkDispatch,
  getState: () => RootState,
) => {
  const db = getProfileDB(getState());
  return resetProfile(db, password);
};

export interface BootResult {
  readonly signer: MultiChainSigner;
  readonly accounts: ReadonlyArray<BcpAccountWithChain | undefined>;
}

// boot sequence initializes all objects
// this is a thunk-form of redux-saga
// tslint:disable-next-line:only-arrow-functions
export const bootSequence = (password: string, blockchains: ReadonlyArray<BlockchainSpec>) => async (
  dispatch: RootThunkDispatch,
  getState: () => RootState,
): Promise<BootResult> => {
  // --- initialize the profile
  const db = getProfileDB(getState());
  // TODO: hmm... seems like I need to add empty args for start....
  const { value: profile } = await fixTypes(dispatch(createProfileAsyncAction.start(db, password, {})));

  // --- get the active identity
  const {
    payload: { identity },
  } = await dispatch(getIdentityAction(profile));

  // --- initiate the signer
  const { payload: signer } = await fixTypes(dispatch(createSignerAction(profile)));

  // --- connect all readers and query account balances
  let initAccounts: ReadonlyArray<Promise<BcpAccountWithChain | undefined>> = [];
  for (const blockchain of blockchains) {
    const { value: conn } = await fixTypes(dispatch(addBlockchainAsyncAction.start(signer, blockchain, {})));
    initAccounts = [...initAccounts, watchAccountAndTransactions(dispatch, conn, identity)];
  }

  // wait for all accounts to initialize
  const accounts = await Promise.all(initAccounts);
  // return initial account state as well as signer
  return { accounts, signer };
};

async function watchAccountAndTransactions(
  dispatch: RootThunkDispatch,
  conn: BcpConnection,
  identity: PublicIdentity,
): Promise<BcpAccountWithChain | undefined> {
  // request the current account and return a promise resolved when it is loaded
  const accountAction = getAccountSyncAction(conn, identity, undefined);
  const account = accountAction.payload;
  await dispatch(accountAction);

  // get a stream of all transactions
  const address = keyToAddress(identity);
  const query: BcpTxQuery = { tags: [bnsFromOrToTag(address)] };
  const stream = conn.liveTx(query);

  // process incoming transactions and add to dispatched/redux store
  const handleTx = async (trans: ConfirmedTransaction) => {
    // conn will change in multiple calls of the for loop, we need to cache the current one in this scope
    const transInfo = await parseConfirmedTransaction(conn, trans, identity);
    if (transInfo) {
      dispatch(addConfirmedTransaction(transInfo));
    }
  };
  stream.subscribe({
    next: handleTx,
    error: err => {
      throw err;
    },
  });

  // update accounts on new transactions (with debounce)
  const onChangeAccount = async () => {
    dispatch(getAccountAsyncAction.start(conn, identity, undefined));
  };
  // make sure we only query once per block or search return at max
  stream.compose(debounce(200)).subscribe({ next: onChangeAccount });

  return account; // resolved when first account is loaded
}
