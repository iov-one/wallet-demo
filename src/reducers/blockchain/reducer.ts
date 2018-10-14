import { ActionType } from "typesafe-actions";

import * as actions from "./actions";
import { BlockchainState } from "./state";

export type BlockchainActions = ActionType<typeof actions>;
const initState: BlockchainState = {
  internal: {
    connections: {},
  },
  accounts: {},
};

export function BlockchainReducer(
  state: BlockchainState = initState,
  action: BlockchainActions,
): BlockchainState {
  switch (action.type) {
    // example of promise resolution
    case "CREATE_SIGNER":
      return { ...state, internal: { ...state.internal, signer: action.payload } };
    // example of synchronous function
    case "ADD_BLOCKCHAIN_SUCCESS":
      const { internal } = state;
      const { connections } = internal;
      const conn = action.payload;
      return { ...state, internal: { ...internal, connections: { ...connections, [conn.chainId()]: conn } } };
    case "GET_ACCOUNT_SUCCESS":
      if (!action.payload) {
        return state;
      }
      const { account, chainId } = action.payload;
      const { address } = account;

      // hmmm... is there an easier way to immutibly update one element deep in the dict?
      const oldChain = state.accounts[chainId] || {};
      const oldAccount = oldChain[address] || {};
      const newChain = { ...oldChain, [address]: { ...oldAccount, account } };
      return { ...state, accounts: { ...state.accounts, [chainId]: newChain } };
    default:
      return state;
  }
}
