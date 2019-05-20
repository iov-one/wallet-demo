import { Amount } from "@iov/bcp";
import { createSelector, createStructuredSelector, Selector } from "reselect";
import { RootState } from "~/reducers";
import { accountNameSelector, ChainAccount, getAllAccounts } from "~/selectors";

export interface SelectorProps {
  readonly name: string | undefined;
  readonly tokens: ReadonlyArray<Amount>;
}

export const tokensSelector = createSelector(
  getAllAccounts,
  (accounts: ReadonlyArray<ChainAccount>) => {
    const tokens = accounts
      .filter(acct => !!acct.account)
      .map(acct => acct.account!.balance)
      .reduce((acc, cur) => [...acc, ...cur], []);
    const sortedTokens = [...tokens].sort((a, b) => a.tokenTicker.localeCompare(b.tokenTicker));
    return sortedTokens;
  },
);

const structuredSelector: Selector<RootState, SelectorProps> = createStructuredSelector({
  name: accountNameSelector,
  tokens: tokensSelector,
});

export default structuredSelector;
