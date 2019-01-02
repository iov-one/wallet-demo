import { BcpCoin, TokenTicker } from "@iov/bcp-types";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { RootMatchMedia } from "~/utils/storybook";
import Layout from "./index";

const TOKENS: ReadonlyArray<BcpCoin> = [
  {
    whole: 8,
    fractional: 25,
    sigFigs: 4,
    tokenTicker: "IOV" as TokenTicker,
    tokenName: "Main token",
  },
  {
    whole: 12,
    fractional: 26775,
    sigFigs: 5,
    tokenTicker: "ETH" as TokenTicker,
    tokenName: "Ethereum token",
  },
];

const ACCOUNT_NAME = "adolfo*iov";

storiesOf("Routes /balance", module)
  .add("Balance view", () => (
    <RootMatchMedia matchMedia={false}>
      <Layout name={ACCOUNT_NAME} tokens={TOKENS} />
    </RootMatchMedia>
  ));
