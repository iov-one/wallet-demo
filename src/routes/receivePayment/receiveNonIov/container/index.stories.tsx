import { Address, TokenTicker } from "@iov/bcp";
import { ChainId } from "@iov/core";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { DeepPartial } from "redux";
import { RootState } from "~/reducers";
import { AccountInfo } from "~/reducers/blockchain/state";
import { ChainToken } from "~/selectors";
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

const tokens: ReadonlyArray<ChainToken> = [
  {
    chainId: "chain-test1" as ChainId,
    token: {
      tokenTicker: "TEST" as TokenTicker,
      tokenName: "test storybook",
      fractionalDigits: 5,
    },
  },
  {
    chainId: "chain-test2" as ChainId,
    token: {
      tokenTicker: "TST" as TokenTicker,
      tokenName: "another test",
      fractionalDigits: 5,
    },
  },
];

const txStore: DeepPartial<RootState> = {
  blockchain: {
    accountInfo: accountInfo,
    tickers: tokens,
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
