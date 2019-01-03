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
  (accounts: ReadonlyArray<ChainAccount>) => {
    if (accounts.length === 0) {
      return [];
    }

    const account = accounts[0];
    if (!account || !account.account) {
      return [];
    }

    return account.account.balance.map((balance: BcpCoin) => {
      const { whole, fractional, tokenTicker, tokenName } = balance;

      return {
        whole,
        fractional,
        sigFigs: 9,
        tokenTicker,
        tokenName,
      };
    });
  },
);

const structuredSelector: Selector<RootState, SelectorProps> = createStructuredSelector({
  name: accountNameSelector,
  tokens: tokensSelector,
});

export default structuredSelector;
