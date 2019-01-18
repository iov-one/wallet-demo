import { BcpCoin, TokenTicker } from "@iov/bcp-types";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { RootMatchMedia } from "~/utils/storybook";
import ConfirmPayment from "../components/ConfirmPayment";
import FillPayment from "../components/FillPayment";

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
      <FillPayment
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
        <FillPayment
          tickersWithBalance={tickersWithBalance}
          onSubmit={noOpAsync}
          balance={balance}
          defaultTicket="IOV"
          onUpdateBalanceToSend={noOp}
        />
      </RootMatchMedia>
    </div>
  ))
  .add("Confirm payment for desktop", () => (
    <RootMatchMedia matchMedia={false}>
      <ConfirmPayment
        payment={{
          recipient: "adolfo*iov",
          amount: "1.45",
          ticker: "IOV",
        }}
      />
    </RootMatchMedia>
  ))
  .add("Confirm payment for phone", () => (
    <div style={{ display: "flex", flexDirection: "column", width: "425px" }}>
      <RootMatchMedia matchMedia={true}>
        <ConfirmPayment
          payment={{
            recipient: "adolfo*iov",
            amount: "1.45",
            ticker: "IOV",
            note: "Sending the best gift ever",
          }}
        />
      </RootMatchMedia>
    </div>
  ));
