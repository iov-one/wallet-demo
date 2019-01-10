import { ActionType } from "typesafe-actions";

import * as actions from "./actions";
import {
  BlockchainState,
  filterAccountByChainAndAddress,
  getAccountByChainAndAddress,
  updateUsernameNft,
} from "./state";

export type BlockchainActions = ActionType<typeof actions>;
const initState: BlockchainState = {
  internal: {
    connections: {},
  },
  tickers: [],
  accountInfo: [],
};

export function blockchainReducer(
  state: BlockchainState = initState,
  action: BlockchainActions,
): BlockchainState {
  switch (action.type) {
    case "CREATE_SIGNER":
      return { ...state, internal: { ...state.internal, signer: action.payload } };
    case "ADD_BLOCKCHAIN_FULFILLED": {
      const { internal } = state;
      const { connections } = internal;
      const conn = action.payload;
      return { ...state, internal: { ...internal, connections: { ...connections, [conn.chainId()]: conn } } };
    }
    case "GET_TICKERS_FULFILLED": {
      // use block scope here so we can use same variable name in different cases
      const { chainId, tickers } = action.payload;
      const add = tickers.map(ticker => ({ chainId, ticker }));
      return { ...state, tickers: [...state.tickers, ...add] };
    }
    case "GET_ACCOUNT_FULFILLED": {
      // use block scope here so we can use same variable name in different cases
      if (!action.payload) {
        return state;
      }
      const { account, chainId } = action.payload;
      const { address } = account;

      // read existing username if it exists
      const current = getAccountByChainAndAddress(state.accountInfo, chainId, address);
      const username = current ? current.username : undefined;
      // merge existing username with new data
      const prepared = { chainId, address, account, username };

      // new account at head of list, remove old copy if it existed
      return {
        ...state,
        accountInfo: [prepared, ...filterAccountByChainAndAddress(state.accountInfo, chainId, address)],
      };
    }
    case "SET_BNS_CHAIN_ID":
      return { ...state, bnsId: action.payload };
    case "GET_USERNAME_FULFILLED":
    case "GET_USERNAME_BY_ADDRESS_FULFILLED":
      if (action.payload === undefined) {
        return state;
      }
      // set the username on all matching chain-address pairs
      return { ...state, accountInfo: updateUsernameNft(state.accountInfo, action.payload) };
    default:
      return state;
  }
}
