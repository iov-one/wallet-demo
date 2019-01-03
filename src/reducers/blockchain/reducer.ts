import { ActionType } from "typesafe-actions";

import * as actions from "./actions";
import { BlockchainState } from "./state";

export type BlockchainActions = ActionType<typeof actions>;
const initState: BlockchainState = {
  internal: {
    connections: {},
  },
  accounts: {},
  tickers: {},
};

export function blockchainReducer(
  state: BlockchainState = initState,
  action: BlockchainActions,
): BlockchainState {
  switch (action.type) {
    // TODO: can we just auto-create upon profile creation?
    case "CREATE_SIGNER":
      return { ...state, internal: { ...state.internal, signer: action.payload } };
    case "ADD_BLOCKCHAIN_FULFILLED":
      const { internal } = state;
      const { connections } = internal;
      const conn = action.payload;
      return { ...state, internal: { ...internal, connections: { ...connections, [conn.chainId()]: conn } } };
    case "GET_TICKERS_FULFILLED": { // use block scope here so we can use same variable name in different cases
      const { chainId, tickers } = action.payload;
      const tickerState = { ...state.tickers, [chainId]: tickers };
      return { ...state, tickers: tickerState };
    }
    case "GET_ACCOUNT_FULFILLED": { // use block scope here so we can use same variable name in different cases
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
    }
    default:
      return state;
  }
}
