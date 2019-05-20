import { Amount, TokenTicker } from "@iov/bcp";
import { ChainId } from "@iov/core";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { Item } from "~/components/forms/SelectField";
import { RootMatchMedia } from "~/utils/storybook";
import ConfirmPayment from "../components/ConfirmPayment";
import FillPayment from "../components/FillPayment";

const noOp = () => true;
const noOpAsync = (_: object) => Promise.resolve();
const balance: Amount = {
  tokenTicker: "IOV" as TokenTicker,
  quantity: "10",
  fractionalDigits: 0,
};

const tickersWithBalance: ReadonlyArray<Item> = [
  { name: "IOV", additionalText: "IOV description" },
  { name: "LSK", additionalText: "LSK description" },
  { name: "CASH", additionalText: "CASH description" },
  { name: "ETH", additionalText: "ETH description" },
];

storiesOf("Routes /send-payment", module)
  .add("Send payment for desktop", () => (
    <RootMatchMedia matchMedia={false}>
      <FillPayment
        tickersWithBalance={tickersWithBalance}
        onSubmit={noOpAsync}
        balance={balance}
        defaultTicker="IOV"
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
          defaultTicker="IOV"
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
          chainId: "bns-yaknet" as ChainId,
        }}
        onContinue={noOp}
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
            chainId: "bns-yaknet" as ChainId,
          }}
          onContinue={noOp}
        />
      </RootMatchMedia>
    </div>
  ));
