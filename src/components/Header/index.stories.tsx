import { storiesOf } from "@storybook/react";
import * as React from "react";
import { ReadonlyDate } from "readonly-date";
import { DeepPartial } from "redux";
import { HeaderPendingTxProps, HeaderTxProps } from "~/components/Header/selector";
import Block from "~/components/layout/Block";
import Hairline from "~/components/layout/Hairline";
import Typography from "~/components/layout/Typography";
import { RootState } from "~/reducers";
import { RootMatchMedia } from "~/utils/storybook";
import Header from "./index";

const Separator = () => (
  <Block margin="xl">
    <Hairline />
  </Block>
);

const pendingTxs: ReadonlyArray<HeaderPendingTxProps> = [
  {
    id: "tx1",
    receiver: "alex*iov",
    amount: "12.5 IOV",
  },
  {
    id: "tx2",
    receiver: "moe*iov",
    amount: "0.14 IOV",
  },
];

const txs: ReadonlyArray<HeaderTxProps> = [
  {
    received: true,
    signer: "george*iov",
    recipient: "me",
    amount: "10.5 LSK",
    time: new ReadonlyDate("2018-12-24T10:51:33.763Z"),
    success: true,
    id: "tx1",
  },
  {
    received: false,
    signer: "me",
    recipient: "alex*iov",
    amount: "25.5 IOV",
    time: new ReadonlyDate("2018-12-24T10:51:33.763Z"),
    success: true,
    id: "tx2",
  },
];

const faultTx: HeaderTxProps = {
  received: false,
  signer: "me",
  recipient: "alex*iov",
  amount: "100.5 IOV",
  time: new ReadonlyDate("2018-12-24T10:51:33.763Z"),
  success: false,
  id: "tx3",
};

const txStore: DeepPartial<RootState> = {
  notification: {
    transaction: txs,
  },
};

const pendingTxStore: DeepPartial<RootState> = {
  notification: {
    pending: pendingTxs,
  },
};

const fullStore = (faulty: boolean): DeepPartial<RootState> => {
  const fullTxs = faulty ? [faultTx, ...txs] : txs;

  return {
    notification: {
      pending: pendingTxs,
      transaction: fullTxs,
    },
  };
};

interface EnahncedHeaderProps {
  readonly match: boolean;
  readonly storeProps?: DeepPartial<RootState>;
  readonly text: string;
}

const EnhancedHeader = ({ match, storeProps, text }: EnahncedHeaderProps) => (
  <React.Fragment>
    <Typography variant="h5">{text}</Typography>
    <RootMatchMedia matchMedia={match} storeProps={storeProps}>
      <Header />
    </RootMatchMedia>
    <Separator />
  </React.Fragment>
);

storiesOf("Components /header", module)
  .add("Header for desktop", () => (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <EnhancedHeader match={false} storeProps={fullStore(false)} text="Full Header" />
      <EnhancedHeader match={false} storeProps={fullStore(true)} text="Faulty full Header" />
      <EnhancedHeader match={false} storeProps={txStore} text="Txs Header" />
      <EnhancedHeader match={false} storeProps={pendingTxStore} text="Pending Header" />
      <EnhancedHeader match={false} text="Empty Header" />
    </div>
  ))
  .add("Header for phones", () => (
    <div style={{ display: "flex", flexDirection: "column", width: "425px" }}>
      <EnhancedHeader match storeProps={fullStore(true)} text="Full Header" />
      <EnhancedHeader match storeProps={fullStore(false)} text="Faultyfull Header" />
      <EnhancedHeader match storeProps={txStore} text="Txs Header" />
      <EnhancedHeader match storeProps={pendingTxStore} text="Pending Header" />
      <EnhancedHeader match text="Empty Header" />
    </div>
  ));
