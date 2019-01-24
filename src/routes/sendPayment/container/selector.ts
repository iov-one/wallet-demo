import { BcpCoin, TxCodec } from "@iov/bcp-types";
import { BnsConnection } from "@iov/bns";
import { createSelector, createStructuredSelector, Selector } from "reselect";
import { RootState } from "~/reducers";
import { tokensSelector } from "~/routes/balance/container/selector";
import { accountNameSelector } from "~/routes/home/container/selector";
import { ChainTicker, getChainTickers, getCodecs, requireBnsConnection } from "~/selectors";

export interface SelectorProps {
  readonly chainTickers: ReadonlyArray<ChainTicker>;
  readonly connection: BnsConnection;
  readonly tickers: ReadonlyArray<string>;
  readonly balanceTokens: ReadonlyArray<BcpCoin>;
  readonly defaultBalance: BcpCoin;
  readonly accountName: string | undefined;
  readonly codecs: {
    readonly [chainId: string]: TxCodec;
  };
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
  connection: requireBnsConnection,
  tickers: balanceTickersSelector,
  balanceTokens: balanceTokensSelector,
  defaultBalance: defaultBalanceSelector,
  accountName: accountNameSelector,
  codecs: getCodecs,
});

export default structuredSelector;
