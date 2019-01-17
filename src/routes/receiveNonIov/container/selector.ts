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
    const tickersByChainAndAddress = accounts
      .filter(acct => acct !== undefined)
      .map(acct => ({
        address: acct.account!.address,
        tickers: tickers.filter(t => t.chainId === acct.chainId).map(t => t.ticker),
      }));

    const tickersByAddress = tickersByChainAndAddress.map(acct =>
      acct.tickers.map(t => ({
        token: t.tokenTicker,
        address: acct.address,
      })),
    );

    return tickersByAddress.reduce((acc, cur) => [...acc, ...cur], []);
  },
);

const structuredSelector: Selector<RootState, SelectorProps> = createStructuredSelector({
  addressList: availableTokensSelector,
});

export default structuredSelector;
