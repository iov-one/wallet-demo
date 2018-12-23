import { Amount } from "@iov/bcp-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import * as React from "react";
import { ReadonlyDate } from "readonly-date";
import receiveTx from "~/components/Header/assets/receive_transaction.svg";
import sendTx from "~/components/Header/assets/send_transaction.svg";
import Img from "~/components/layout/Image";

export interface TxNotificationProps {
  readonly received: boolean;
  readonly sender: string;
  readonly receiver: string;
  readonly amount: Amount;
  readonly time: ReadonlyDate;
  // readonly success: boolean;
}

interface Props {
  readonly item: TxNotificationProps;
}

const TxItem = ({ item }: Props) => {
  const icon = item.received ? receiveTx : sendTx;

  return (
    <ListItem>
      <Img src={icon} height={30} alt="Tx operation" />
      <ListItemText primary="Lorem ipsum" secondary="... Sending" />
    </ListItem>
  );
};

export default TxItem;
