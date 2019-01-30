import { createSelector, createStructuredSelector, Selector } from "reselect";
import { RootState } from "~/reducers";
import { AccountInfo } from "~/reducers/blockchain";
import { ChainTicker, getAllAccounts, getChainTickers } from "~/selectors";
import { TickerWithAddress } from "./index";

export interface SelectorProps {
  readonly tickersList: ReadonlyArray<TickerWithAddress>;
}

export const availableTokensSelector = createSelector(
  getAllAccounts,
  getChainTickers,
  (accounts: ReadonlyArray<AccountInfo>, tickers: ReadonlyArray<ChainTicker>) => {
    if (tickers.length === 0) {
      return [];
    }
    const tickersByAddress = accounts.map(acct =>
      tickers
        .filter(t => t.chainId === acct.chainId)
        .map(t => ({
          address: acct.address,
          name: t.ticker.tokenTicker,
          additionalText: t.ticker.tokenName,
        })),
    );

    return tickersByAddress.reduce((acc, cur) => [...acc, ...cur], []);
  },
);

const structuredSelector: Selector<RootState, SelectorProps> = createStructuredSelector({
  tickersList: availableTokensSelector,
});

export default structuredSelector;
