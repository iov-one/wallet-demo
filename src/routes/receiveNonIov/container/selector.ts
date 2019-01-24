import { createSelector, createStructuredSelector, Selector } from "reselect";
import { SelectFieldItem } from "~/components/forms/SelectField";
import { RootState } from "~/reducers";
import { AccountInfo } from "~/reducers/blockchain";
import { ChainTicker, getChainTickers, getMyAccounts } from "~/selectors";

export interface SelectorProps {
  readonly addressList: ReadonlyArray<SelectFieldItem>;
}

export const availableTokensSelector = createSelector(
  getMyAccounts,
  getChainTickers,
  (accounts: ReadonlyArray<AccountInfo>, tickers: ReadonlyArray<ChainTicker>) => {
    if (tickers.length === 0) {
      return [];
    }
    const tickersByAddress = accounts.map(acct =>
      tickers
        .filter(t => t.chainId === acct.chainId)
        .map(t => ({
          value: acct.address,
          label: t.ticker.tokenTicker,
          description: t.ticker.tokenName,
        })),
    );

    return tickersByAddress.reduce((acc, cur) => [...acc, ...cur], []);
  },
);

const structuredSelector: Selector<RootState, SelectorProps> = createStructuredSelector({
  addressList: availableTokensSelector,
});

export default structuredSelector;
