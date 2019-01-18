import { BcpCoin } from "@iov/bcp-types";
import { createSelector, createStructuredSelector, Selector } from "reselect";
import { RootState } from "~/reducers";
import { TickerWithChain } from "~/reducers/blockchain";
import { tokensSelector } from "~/routes/balance/container/selector";
import { getChainTickers } from "~/selectors";

export interface SelectorProps {
  readonly chainTickers: ReadonlyArray<TickerWithChain>;
  readonly tickers: ReadonlyArray<string>;
  readonly balanceTokens: ReadonlyArray<BcpCoin>;
  readonly defaultBalance: BcpCoin;
}

const IOV = "IOV";

const balanceTokensSelector = createSelector(
  tokensSelector,
  (tokens: ReadonlyArray<BcpCoin>) => tokens.filter(token => Number(token.quantity) > 0),
);

const balanceTickersSelector = createSelector(
  balanceTokensSelector,
  (balanceTokens: ReadonlyArray<BcpCoin>) =>
    balanceTokens.map(balanceToken => balanceToken.tokenTicker as string),
);

const defaultBalanceSelector = createSelector(
  balanceTokensSelector,
  balanceTickersSelector,
  (balances: ReadonlyArray<BcpCoin>, tickers: ReadonlyArray<string>): BcpCoin => {
    const ticker = tickers.includes(IOV) ? IOV : tickers[0];
    const defaultBalance = balances.find(balance => balance.tokenTicker === ticker);

    return defaultBalance!;
  },
);

const structuredSelector: Selector<RootState, SelectorProps> = createStructuredSelector({
  chainTickers: getChainTickers,
  tickers: balanceTickersSelector,
  balanceTokens: balanceTokensSelector,
  defaultBalance: defaultBalanceSelector,
});

export default structuredSelector;
