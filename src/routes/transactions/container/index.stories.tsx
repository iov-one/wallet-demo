import { TokenTicker } from "@iov/core";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { ReadonlyDate } from "readonly-date";
import { stringToAmount } from "~/logic";
import { ProcessedTx } from "~/store/notifications/state";
import { RootMatchMedia } from "~/utils/storybook";
import { Layout } from "../components";

const noOp = () => true;

const txs: ReadonlyArray<ProcessedTx> = [
  {
    received: true,
    signer: "george*iov",
    recipient: "me",
    amount: stringToAmount("10.5", "LSK" as TokenTicker),
    time: new ReadonlyDate("2018-11-13T05:35:03.763Z"),
    success: true,
    id: "tx1",
  },
  {
    received: false,
    signer: "me",
    recipient: "alex*iov",
    amount: stringToAmount("25.5", "IOV" as TokenTicker),
    time: new ReadonlyDate("2018-10-05T16:12:00.763Z"),
    success: true,
    id: "tx2",
  },
  {
    received: false,
    signer: "me",
    recipient: "alex*iov",
    amount: stringToAmount("100.5", "IOV" as TokenTicker),
    time: new ReadonlyDate("2018-12-24T10:51:33.763Z"),
    success: false,
    id: "tx3",
  },
];

storiesOf("Routes /transactions", module)
  .add("Transactions for desktop", () => (
    <RootMatchMedia matchMedia={false}>
      <Layout txs={txs} onChangeRows={noOp} />
    </RootMatchMedia>
  ))
  .add("Transactions for phones", () => (
    <RootMatchMedia matchMedia={true}>
      <Layout txs={txs} onChangeRows={noOp} />
    </RootMatchMedia>
  ));
