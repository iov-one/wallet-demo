import { BcpCoin } from "@iov/bcp-types";
import { createSelector, createStructuredSelector, Selector } from "reselect";
import { RootState } from "~/reducers";
import { tokensSelector } from "~/routes/balance/container/selector";

export interface SelectorProps {
  readonly tickers: ReadonlyArray<string>;
  readonly balanceTokens: ReadonlyArray<BcpCoin>;
  readonly defaultToken: string;
}

const IOV = "IOV"

const balanceTokensSelector = createSelector(
  tokensSelector,
  (tokens: ReadonlyArray<BcpCoin>) =>
    tokens.filter(token => Number(token.quantity) > 0)
);

const balanceTickersSelector = createSelector(
  balanceTokensSelector,
  (balanceTokens: ReadonlyArray<BcpCoin>) =>
  balanceTokens.map(balanceToken => balanceToken.tokenTicker as string)
);

const defaultTickerSelector = createSelector(
  balanceTickersSelector,
  (tickers: ReadonlyArray<string>) => {
    if (tickers.includes(IOV)) {
      return IOV
    }

    return tickers[0]
  }

)

const structuredSelector: Selector<RootState, SelectorProps> = createStructuredSelector({
  tickers: balanceTickersSelector,
  balanceTokens: balanceTokensSelector,
  defaultToken: defaultTickerSelector,
});

export default structuredSelector;