import { TokenTicker } from "@iov/core";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import Block from "~/components/layout/Block";
import Hairline from "~/components/layout/Hairline";
import Typography from "~/components/layout/Typography";
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

storiesOf("Components /header", module).add("Header for desktop", () => {
  return (
    <React.Fragment>
      <Typography variant="h5">Header without both: txs and pending txs</Typography>
      <RootMatchMedia matchMedia={false}>
        <Header pendingTxs={[]} />
      </RootMatchMedia>
      <Separator />
      <Typography variant="h5">Header without txs but having pending txs</Typography>
      <RootMatchMedia matchMedia={false}>
        <Header pendingTxs={pendingTxs} />
      </RootMatchMedia>
      <Separator />
    </React.Fragment>
  );
});
