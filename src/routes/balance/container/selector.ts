import { BcpCoin } from "@iov/bcp-types";
import { createSelector, createStructuredSelector, Selector } from "reselect";
import { RootState } from "~/reducers";
import { accountNameSelector } from "~/routes/home/container/selector";
import { ChainAccount, getMyAccounts } from "~/selectors";

export interface SelectorProps {
  readonly name: string | undefined;
  readonly tokens: ReadonlyArray<BcpCoin>;
}

export const tokensSelector = createSelector(
  getMyAccounts,
  (accounts: ReadonlyArray<ChainAccount>) =>
    accounts
      .filter(acct => !!acct.account)
      .map(acct => acct.account!.balance)
      .reduce((acc, cur) => [...acc, ...cur], []),
);

const structuredSelector: Selector<RootState, SelectorProps> = createStructuredSelector({
  name: accountNameSelector,
  tokens: tokensSelector,
});

export default structuredSelector;
