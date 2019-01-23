import { BcpCoin, TxCodec } from "@iov/bcp-types";
import { BnsConnection } from "@iov/bns";
import { createSelector, createStructuredSelector, Selector } from "reselect";
import { SelectFieldItem } from "~/components/forms/SelectField";
import { RootState } from "~/reducers";
import { tokensSelector } from "~/routes/balance/container/selector";
import { accountNameSelector } from "~/routes/home/container/selector";
import { ChainTicker, getChainTickers, getCodecs, requireBnsConnection } from "~/selectors";

export interface SelectorProps {
  readonly chainTickers: ReadonlyArray<ChainTicker>;
  readonly connection: BnsConnection;
  readonly tickers: ReadonlyArray<SelectFieldItem>;
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
    balanceTokens.map(balanceToken => ({
      label: balanceToken.tokenTicker as string,
      description: balanceToken.tokenName,
    })),
);

const defaultBalanceSelector = createSelector(
  balanceTokensSelector,
  balanceTickersSelector,
  (balances: ReadonlyArray<BcpCoin>, tickers: ReadonlyArray<SelectFieldItem>): BcpCoin => {
    const iovTicker = tickers.find(item => item.label === IOV);
    const ticker = iovTicker ? iovTicker : tickers[0];
    const defaultBalance = balances.find(balance => balance.tokenTicker === ticker.label);

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
