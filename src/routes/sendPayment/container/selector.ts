import { createSelector, createStructuredSelector, Selector } from "reselect";

import { BcpCoin } from "@iov/bcp-types";
import { BnsConnection } from "@iov/bns";
import { MultiChainSigner } from "@iov/core";

import { Item } from "~/components/forms/SelectField";
import { RootState } from "~/reducers";
import { tokensSelector } from "~/routes/balance/container/selector";
import { accountNameSelector } from "~/routes/home/container/selector";
import { ChainTicker, getChainTickers, requireBnsConnection, requireSigner } from "~/selectors";

export interface SelectorProps {
  readonly chainTickers: ReadonlyArray<ChainTicker>;
  readonly connection: BnsConnection;
  readonly tickers: ReadonlyArray<Item>;
  readonly balanceTokens: ReadonlyArray<BcpCoin>;
  readonly defaultBalance: BcpCoin;
  readonly accountName: string | undefined;
  readonly signer: MultiChainSigner;
}

const IOV = "IOV";

const balanceTokensSelector = createSelector(
  tokensSelector,
  (tokens: ReadonlyArray<BcpCoin>) => tokens.filter(token => Number(token.quantity) > 0),
);

const balanceTickersSelector = createSelector(
  balanceTokensSelector,
  (balanceTokens: ReadonlyArray<BcpCoin>) =>
    balanceTokens.map(balanceToken => ({
      name: balanceToken.tokenTicker as string,
      additionaName: balanceToken.tokenName,
    })),
);

const defaultBalanceSelector = createSelector(
  balanceTokensSelector,
  balanceTickersSelector,
  (balances: ReadonlyArray<BcpCoin>, tickers: ReadonlyArray<Item>): BcpCoin => {
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
