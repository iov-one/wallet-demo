import { BcpCoin, TokenTicker } from "@iov/bcp-types";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { RootMatchMedia } from "~/utils/storybook";
import Layout from "../components";

const noOp = (_: string) => true;
const noOpAsync = (_: object) => Promise.resolve();
const balance: BcpCoin = {
  tokenTicker: "IOV" as TokenTicker,
  tokenName: "IOV default Token",
  quantity: "10",
  fractionalDigits: 0,
};

const tickersWithBalance: ReadonlyArray<string> = ["IOV", "LSK", "MMM"];

storiesOf("Routes /send-payment", module)
  .add("Send payment for desktop", () => (
    <RootMatchMedia matchMedia={false}>
      <Layout
        tickersWithBalance={tickersWithBalance}
        onSubmit={noOpAsync}
        balance={balance}
        defaultTicket="IOV"
        onUpdateBalanceToSend={noOp}
      />
    </RootMatchMedia>
  ))
  .add("Send payment for phone", () => (
    <div style={{ display: "flex", flexDirection: "column", width: "425px" }}>
      <RootMatchMedia matchMedia={true}>
        <Layout
          tickersWithBalance={tickersWithBalance}
          onSubmit={noOpAsync}
          balance={balance}
          defaultTicket="IOV"
          onUpdateBalanceToSend={noOp}
        />
      </RootMatchMedia>
    </div>
  ));
