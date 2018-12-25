import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import * as React from "react";
import errorTx from "~/components/Header/assets/transactionError.svg";
import receiveTx from "~/components/Header/assets/transactionReceive.svg";
import sendTx from "~/components/Header/assets/transactionSend.svg";
import { HeaderTxProps } from "~/components/Header/selector";
import Img from "~/components/layout/Image";
import Typography from "~/components/layout/Typography";

interface ItemProps extends WithStyles<typeof styles> {
  readonly item: HeaderTxProps;
}

interface MsgProps {
  readonly received: boolean;
  readonly signer: string;
  readonly recipient: string;
  readonly amount: string;
}

interface MsgErrorProps {
  readonly amount: string;
  readonly recipient: string;
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
        {`${recipientMsg} `}
      </Typography>
      <Typography weight="semibold" inline>
        {amount}
      </Typography>
    </React.Fragment>
  );
};

const MsgError = ({ amount, recipient }: MsgErrorProps) => (
  <React.Fragment>
    <Typography inline>{"Your "}</Typography>
    <Typography weight="semibold" inline>
      {amount}
    </Typography>
    <Typography inline>{" payment to "}</Typography>
    <Typography weight="semibold" inline>
      {recipient}
    </Typography>
    <Typography inline>{" was "}</Typography>
    <Typography weight="semibold" inline>
      {"unsuccessful"}
    </Typography>
    <Typography inline>{", please try again later"}</Typography>
  </React.Fragment>
);

const styles = createStyles({
  msg: {
    "& > span": {
      lineHeight: 1,
    },
  },
});

const TxItem = ({ item, classes }: ItemProps) => {
  const { time, amount, received, signer, recipient, success } = item;

  const icon = success ? (received ? receiveTx : sendTx) : errorTx;
  const msg = success ? (
    <Msg received={received} amount={amount} signer={signer} recipient={recipient} />
  ) : (
    <MsgError amount={amount} recipient={recipient} />
  );

  return (
    <ListItem>
      <Img src={icon} height={30} alt="Tx operation" />
      <ListItemText className={classes.msg} primary={msg} secondary={time.toLocaleString()} />
    </ListItem>
  );
};

export default withStyles(styles)(TxItem);
