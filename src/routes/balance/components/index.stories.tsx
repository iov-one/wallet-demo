import { BcpCoin, TokenTicker } from "@iov/bcp-types";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import PageMenu from "~/components/pages/PageMenu";
import { RootMatchMedia } from "~/utils/storybook";
import Layout from "./index";

const TOKENS: ReadonlyArray<BcpCoin> = [
  {
    quantity: "82500",
    fractionalDigits: 4,
    tokenTicker: "IOV" as TokenTicker,
    tokenName: "Main token",
  },
  {
    quantity: "1226775",
    fractionalDigits: 5,
    tokenTicker: "ETH" as TokenTicker,
    tokenName: "Ethereum token",
  },
];

const ACCOUNT_NAME = "adolfo*iov";

const renderProps = (phone: boolean) => (
  <Layout
    name={ACCOUNT_NAME}
    tokens={TOKENS}
    phone={phone}
    onReceivePayment={() => true}
    onSendPayment={() => true}
  />
);
storiesOf("Routes /balance", module)
  .add("Balance view for desktop", () => (
    <RootMatchMedia matchMedia={false}>
      <PageMenu phoneFullWidth renderProps={renderProps} />
    </RootMatchMedia>
  ))
  .add("Balance view for phones", () => (
    <RootMatchMedia matchMedia={true}>
      <div style={{ maxWidth: "360px" }}>
        <PageMenu phoneFullWidth renderProps={renderProps} />
      </div>
    </RootMatchMedia>
  ));
