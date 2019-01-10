import { TokenTicker } from "@iov/core";
import { createSelector, createStructuredSelector, Selector } from "reselect";
import { RootState } from "~/reducers";
import { ChainAccount, ChainTicker, getChainTickers, getMyAccounts } from "~/selectors";

export interface AddressInfo {
  readonly token: TokenTicker;
  readonly address: string;
}

export interface SelectorProps {
  readonly addressList: ReadonlyArray<AddressInfo>;
}

export const availableTokensSelector = createSelector(
  getMyAccounts,
  getChainTickers,
  (accounts: ReadonlyArray<ChainAccount>, tickers: ReadonlyArray<ChainTicker>) => {
    if (tickers.length === 0) {
      return [];
    }

    // TODO modify this when we have multichain support
    const account = accounts[0];
    const tokenAddress = account.account ? account.account.address : undefined;
    if (!tokenAddress) {
      return [];
    }

    return tickers.map(({ ticker }) => ({
      token: ticker.tokenTicker,
      address: tokenAddress,
    }));
  },
);

const structuredSelector: Selector<RootState, SelectorProps> = createStructuredSelector({
  addressList: availableTokensSelector,
});

export default structuredSelector;
