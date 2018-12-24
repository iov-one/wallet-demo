import { TokenTicker } from "@iov/core";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { ReadonlyDate } from "readonly-date";
import Block from "~/components/layout/Block";
import Hairline from "~/components/layout/Hairline";
import Typography from "~/components/layout/Typography";
import { TransNotificationInfo } from "~/logic";
import { PendingNotificationItemProps } from "~/reducers/notification";
import { RootMatchMedia } from "~/utils/storybook";
import Header from "./index";

const Separator = () => (
  <Block margin="xl">
    <Hairline />
  </Block>
);

const pendingTxs: ReadonlyArray<PendingNotificationItemProps> = [
  {
    id: "foo",
    receiver: "alex*iov",
    amount: { whole: 12, fractional: 5, tokenTicker: "IOV" as TokenTicker },
  },
  {
    id: "bar",
    receiver: "moe*iov",
    amount: { whole: 0, fractional: 14, tokenTicker: "IOV" as TokenTicker },
  },
];

const txs: ReadonlyArray<TransNotificationInfo> = [
  {
    received: true,
    sender: "george*iov",
    receiver: "me",
    amount: {
      whole: 100,
      fractional: 5,
      tokenTicker: "LSK" as TokenTicker,
    },
    time: new ReadonlyDate("1h"),
  },
  {
    received: false,
    sender: "me",
    receiver: "alex*iov",
    amount: {
      whole: 100,
      fractional: 5,
      tokenTicker: "IOV" as TokenTicker,
    },
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
