import { createSelector, createStructuredSelector, Selector } from "reselect";

import { Amount } from "@iov/bcp";
import { BnsConnection } from "@iov/bns";
import { MultiChainSigner } from "@iov/core";

import { Item } from "~/components/forms/SelectField";
import { RootState } from "~/reducers";
import { tokensSelector } from "~/routes/balance/container/selector";
import {
  accountNameSelector,
  ChainToken,
  getChainTickers,
  requireBnsConnection,
  requireSigner,
} from "~/selectors";

export interface SelectorProps {
  readonly chainTickers: ReadonlyArray<ChainToken>;
  readonly connection: BnsConnection;
  readonly tickers: ReadonlyArray<Item>;
  readonly balanceTokens: ReadonlyArray<Amount>;
  readonly defaultBalance: Amount;
  readonly accountName: string | undefined;
  readonly signer: MultiChainSigner;
}

const IOV = "IOV";

export const balanceTokensSelector = createSelector(
  tokensSelector,
  (tokens: ReadonlyArray<Amount>) => tokens.filter(token => Number(token.quantity) > 0),
);

const balanceTickersSelector = createSelector(
  balanceTokensSelector,
  (balanceTokens: ReadonlyArray<Amount>) => {
    const sortedTokens = [...balanceTokens].sort((a, b) => a.tokenTicker.localeCompare(b.tokenTicker));
    return sortedTokens.map(balanceToken => ({
      name: balanceToken.tokenTicker as string,
      additionaName: "Hmmmm, no idea what to put here. Is this even shown?",
    }));
  },
);

const defaultBalanceSelector = createSelector(
  balanceTokensSelector,
  balanceTickersSelector,
  (balances: ReadonlyArray<Amount>, tickers: ReadonlyArray<Item>): Amount => {
    const iovTicker = tickers.find(item => item.name === IOV);
    const ticker = iovTicker ? iovTicker : tickers[0];
    const defaultBalance = balances.find(balance => balance.tokenTicker === ticker.name);

    return defaultBalance!;
  },
);

const structuredSelector: Selector<RootState, SelectorProps> = createStructuredSelector({
  chainTickers: getChainTickers,
  connection: requireBnsConnection,
  tickers: balanceTickersSelector,
  balanceTokens: balanceTokensSelector,
  defaultBalance: defaultBalanceSelector,
  accountName: accountNameSelector,
  signer: requireSigner,
});

export default structuredSelector;
