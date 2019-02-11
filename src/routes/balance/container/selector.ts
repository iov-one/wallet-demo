import { BcpCoin } from "@iov/bcp-types";
import { createSelector, createStructuredSelector, Selector } from "reselect";
import { RootState } from "~/reducers";
import { accountNameSelector, ChainAccount, getAllAccounts } from "~/selectors";

export interface SelectorProps {
  readonly name: string | undefined;
  readonly tokens: ReadonlyArray<BcpCoin>;
}

export const tokensSelector = createSelector(
  getAllAccounts,
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
