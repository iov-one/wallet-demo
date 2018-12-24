import { storiesOf } from "@storybook/react";
import * as React from "react";
import { ReadonlyDate } from "readonly-date";
import Block from "~/components/layout/Block";
import Hairline from "~/components/layout/Hairline";
import Typography from "~/components/layout/Typography";
import { RootMatchMedia } from "~/utils/storybook";
import { HeaderPendingTxProps, HeaderTxProps } from "../selector";
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
    time: new ReadonlyDate("1h"),
  },
  {
    received: false,
    signer: "me",
    recipient: "alex*iov",
    amount: "100.5 IOV",
    time: new ReadonlyDate("3d"),
  },
];

storiesOf("Components /header", module).add("Header for desktop", () => {
  return (
    <React.Fragment>
      <Typography variant="h5">Header without both: txs and pending txs</Typography>
      <RootMatchMedia matchMedia={false}>
        <Header pendingTxs={[]} txs={[]} />
      </RootMatchMedia>
      <Separator />
      <Typography variant="h5">Header without txs but having pending txs</Typography>
      <RootMatchMedia matchMedia={false}>
        <Header pendingTxs={pendingTxs} txs={[]} />
      </RootMatchMedia>
      <Separator />
      <Typography variant="h5">Header with both txs and pending txs</Typography>
      <RootMatchMedia matchMedia={false}>
        <Header pendingTxs={pendingTxs} txs={txs} />
      </RootMatchMedia>
      <Separator />
    </React.Fragment>
  );
});
