import { Address, BcpTicker } from "@iov/bcp-types";
import { ChainId } from "@iov/core";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { DeepPartial } from "redux";
import { RootState } from "~/reducers";
import { AccountInfo } from "~/reducers/blockchain/state";
import { ChainTicker } from "~/selectors";
import { RootMatchMedia } from "~/utils/storybook";
import ReceiveNonIov from "./index";

const accountInfo: ReadonlyArray<AccountInfo> = [
  {
    chainId: "chain-test1" as ChainId,
    address: "123-addr" as Address,
  },
  {
    chainId: "chain-test2" as ChainId,
    address: "321-addr" as Address,
  },
];

const tickers: ReadonlyArray<ChainTicker> = [
  {
    chainId: "chain-test1" as ChainId,
    ticker: {
      tokenTicker: "TEST",
      tokenName: "test storybook",
      fractionalDigits: 5,
    } as BcpTicker,
  },
  {
    chainId: "chain-test2" as ChainId,
    ticker: {
      tokenTicker: "TST",
      tokenName: "another test",
      fractionalDigits: 5,
    } as BcpTicker,
  },
];

const txStore: DeepPartial<RootState> = {
  blockchain: {
    accountInfo: accountInfo,
    tickers: tickers,
  },
};

storiesOf("Routes /receive-external", module)
  .add("Receive tokens from NON iov address for desktop", () => (
    <RootMatchMedia matchMedia={false} storeProps={txStore}>
      <ReceiveNonIov />
    </RootMatchMedia>
  ))
  .add("Receive tokens from NON iov address for phones", () => (
    <div style={{ display: "flex", flexDirection: "column", width: "425px" }}>
      <RootMatchMedia matchMedia={true} storeProps={txStore}>
        <ReceiveNonIov />
      </RootMatchMedia>
    </div>
  ));
