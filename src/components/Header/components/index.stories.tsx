import { storiesOf } from "@storybook/react";
import * as React from "react";
import { ReadonlyDate } from "readonly-date";
import { HeaderPendingTxProps, HeaderTxProps } from "~/components/Header/selector";
import Block from "~/components/layout/Block";
import Hairline from "~/components/layout/Hairline";
import Typography from "~/components/layout/Typography";
import { RootMatchMedia } from "~/utils/storybook";
import Header from "./index";

const Separator = () => (
  <Block margin="xl">
    <Hairline />
  </Block>
);

const pendingTxs: ReadonlyArray<HeaderPendingTxProps> = [
  {
    receiver: "alex*iov",
    amount: "12.5 IOV",
  },
  {
    receiver: "moe*iov",
    amount: "0.14 IOV",
  },
];

const txs: ReadonlyArray<HeaderTxProps> = [
  {
    received: true,
    signer: "george*iov",
    recipient: "me",
    amount: "100.5 LSK",
    time: new ReadonlyDate("2018-12-24T10:51:33.763Z"),
    success: true,
    id: "tx1",
  },
  {
    received: false,
    signer: "me",
    recipient: "alex*iov",
    amount: "100.5 IOV",
    time: new ReadonlyDate("2018-12-24T10:51:33.763Z"),
    success: true,
    id: "tx2",
  },
  {
    received: false,
    signer: "me",
    recipient: "alex*iov",
    amount: "100.5 IOV",
    time: new ReadonlyDate("2018-12-24T10:51:33.763Z"),
    success: false,
    id: "tx3",
  },
];

storiesOf("Components /header", module)
  .add("Header for desktop", () => {
    return (
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Typography variant="h5">Header with both txs and pending txs</Typography>
        <RootMatchMedia matchMedia={false}>
          <Header pendingTxs={pendingTxs} txs={txs} />
        </RootMatchMedia>
        <Separator />
        <Typography variant="h5">Header without txs but having pending txs</Typography>
        <RootMatchMedia matchMedia={false}>
          <Header pendingTxs={pendingTxs} txs={[]} />
        </RootMatchMedia>
        <Separator />
        <Typography variant="h5">Header without both: txs and pending txs</Typography>
        <RootMatchMedia matchMedia={false}>
          <Header pendingTxs={[]} txs={[]} />
        </RootMatchMedia>
        <Separator />
      </div>
    );
  })
  .add("Header for phones", () => {
    return (
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Typography variant="h5">Header with both txs and pending txs</Typography>
        <RootMatchMedia matchMedia={true}>
          <Header pendingTxs={pendingTxs} txs={txs} />
        </RootMatchMedia>
        <Separator />
        <Typography variant="h5">Header without txs but having pending txs</Typography>
        <RootMatchMedia matchMedia={true}>
          <Header pendingTxs={pendingTxs} txs={[]} />
        </RootMatchMedia>
        <Separator />
        <Typography variant="h5">Header without both: txs and pending txs</Typography>
        <RootMatchMedia matchMedia={true}>
          <Header pendingTxs={[]} txs={[]} />
        </RootMatchMedia>
        <Separator />
      </div>
    );
  });
