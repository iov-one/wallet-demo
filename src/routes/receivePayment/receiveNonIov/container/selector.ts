import { createSelector, createStructuredSelector, Selector } from "reselect";
import { Item } from "~/components/forms/SelectField";
import { RootState } from "~/reducers";
import { AccountInfo } from "~/reducers/blockchain";
import { ChainToken, getAllAccounts, getChainTokens } from "~/selectors";

export interface TickerWithAddress extends Item {
  readonly address: string;
}

export interface SelectorProps {
  readonly tickersList: ReadonlyArray<TickerWithAddress>;
}

export const availableTokensSelector = createSelector(
  getAllAccounts,
  getChainTokens,
  (accounts: ReadonlyArray<AccountInfo>, tokens: ReadonlyArray<ChainToken>) => {
    if (tokens.length === 0) {
      return [];
    }
    const tokensByAddress = accounts.map(acct =>
      tokens
        .filter(t => t.chainId === acct.chainId)
        .map(t => ({
          address: acct.address,
          name: t.token.tokenTicker,
          additionalText: t.token.tokenName,
        })),
    );

    const tickersList = tokensByAddress.reduce((acc, cur) => [...acc, ...cur], []);
    tickersList.sort((a, b) => a.name.localeCompare(b.name));
    return tickersList;
  },
);

const structuredSelector: Selector<RootState, SelectorProps> = createStructuredSelector({
  tickersList: availableTokensSelector,
});

export default structuredSelector;
