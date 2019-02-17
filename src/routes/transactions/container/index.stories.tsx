import { TokenTicker } from "@iov/core";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { ReadonlyDate } from "readonly-date";
import { DeepPartial } from "redux";
import { stringToAmount } from "~/logic";
import { RootState } from "~/reducers";
import { ProcessedTx } from "~/store/notifications/state";
import { RootMatchMedia } from "~/utils/storybook";
import Transactions from "./index";

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
  {
    received: true,
    signer: "Lx9oa7re0894eopiahsdpf98as7y908",
    recipient: "me",
    amount: stringToAmount("10.5", "LSK" as TokenTicker),
    time: new ReadonlyDate("2018-11-13T05:35:03.763Z"),
    success: true,
    id: "tx4",
  },
  {
    received: false,
    signer: "me",
    recipient: "alex*iov",
    amount: stringToAmount("25.5", "IOV" as TokenTicker),
    time: new ReadonlyDate("2018-10-05T16:12:00.763Z"),
    success: true,
    id: "tx5",
  },
  {
    received: false,
    signer: "me",
    recipient: "alex*iov",
    amount: stringToAmount("100.5", "IOV" as TokenTicker),
    time: new ReadonlyDate("2018-12-24T10:51:33.763Z"),
    success: false,
    id: "tx6",
  },
  {
    received: true,
    signer: "george*iov",
    recipient: "me",
    amount: stringToAmount("10.5", "LSK" as TokenTicker),
    time: new ReadonlyDate("2018-11-13T05:35:03.763Z"),
    success: true,
    id: "tx7",
  },
  {
    received: false,
    signer: "me",
    recipient: "alex*iov",
    amount: stringToAmount("25.5", "IOV" as TokenTicker),
    time: new ReadonlyDate("2018-10-05T16:12:00.763Z"),
    success: true,
    id: "tx8",
  },
  {
    received: false,
    signer: "me",
    recipient: "alex*iov",
    amount: stringToAmount("100.5", "IOV" as TokenTicker),
    time: new ReadonlyDate("2018-12-24T10:51:33.763Z"),
    success: false,
    id: "tx9",
  },
  {
    received: true,
    signer: "george*iov",
    recipient: "me",
    amount: stringToAmount("10.5", "LSK" as TokenTicker),
    time: new ReadonlyDate("2018-11-13T05:35:03.763Z"),
    success: true,
    id: "tx10",
  },
  {
    received: false,
    signer: "me",
    recipient: "alex*iov",
    amount: stringToAmount("25.5", "IOV" as TokenTicker),
    time: new ReadonlyDate("2018-10-05T16:12:00.763Z"),
    success: true,
    id: "tx11",
  },
  {
    received: false,
    signer: "me",
    recipient: "alex*iov",
    amount: stringToAmount("100.5", "IOV" as TokenTicker),
    time: new ReadonlyDate("2018-12-24T10:51:33.763Z"),
    success: false,
    id: "tx12",
  },
  {
    received: true,
    signer: "george*iov",
    recipient: "me",
    amount: stringToAmount("10.5", "LSK" as TokenTicker),
    time: new ReadonlyDate("2018-11-13T05:35:03.763Z"),
    success: true,
    id: "tx13",
  },
  {
    received: false,
    signer: "Lxasdoiu9847ioasdpfuy098q23rui",
    recipient: "alex*iov",
    amount: stringToAmount("25.5", "IOV" as TokenTicker),
    time: new ReadonlyDate("2018-10-05T16:12:00.763Z"),
    success: true,
    id: "tx14",
  },
  {
    received: false,
    signer: "me",
    recipient: "alex*iov",
    amount: stringToAmount("100.5", "IOV" as TokenTicker),
    time: new ReadonlyDate("2018-12-24T10:51:33.763Z"),
    success: false,
    id: "tx15",
  },
];

const txStore: DeepPartial<RootState> = {
  notification: {
    transaction: txs,
  },
};

storiesOf("Routes /transactions", module)
  .add("Transactions for desktop", () => (
    <RootMatchMedia matchMedia={false} storeProps={txStore}>
      <Transactions />
    </RootMatchMedia>
  ))
  .add("Transactions for phones", () => (
    <RootMatchMedia matchMedia={true} storeProps={txStore}>
      <Transactions />
    </RootMatchMedia>
  ));
