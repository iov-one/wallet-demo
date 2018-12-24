import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import * as React from "react";
import receiveTx from "~/components/Header/assets/receive_transaction.svg";
import sendTx from "~/components/Header/assets/send_transaction.svg";
import { HeaderTxProps } from "~/components/Header/selector";
import Img from "~/components/layout/Image";
import Typography from "~/components/layout/Typography";

interface ItemProps {
  readonly item: HeaderTxProps;
}

interface MsgProps {
  readonly received: boolean;
  readonly signer: string;
  readonly recipient: string;
  readonly amount: string;
}

const Msg = ({ amount, received, signer, recipient }: MsgProps) => {
  const signerWeight = received ? "semibold" : "regular";
  const signerMsg = received ? signer : "You";

  const recipientWeight = received ? "regular" : "semibold";
  const recipientMsg = received ? "you" : recipient;

  return (
    <React.Fragment>
      <Typography weight={signerWeight} inline>
        {signerMsg}
      </Typography>
      <Typography inline>{" sent "}</Typography>
      <Typography weight={recipientWeight} inline>
        {recipientMsg}
      </Typography>
      <Typography weight="semibold" inline>
        {amount}
      </Typography>
    </React.Fragment>
  );
};

const TxItem = ({ item }: ItemProps) => {
  const { time, amount, received, signer, recipient } = item;

  const icon = received ? receiveTx : sendTx;

  return (
    <ListItem>
      <Img src={icon} height={30} alt="Tx operation" />
      <ListItemText
        primary={<Msg received={received} amount={amount} signer={signer} recipient={recipient} />}
        secondary={time.toLocaleString()}
      />
    </ListItem>
  );
};

export default TxItem;
