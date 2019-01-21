import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import * as React from "react";
import errorTx from "~/components/Header/assets/transactionError.svg";
import receiveTx from "~/components/Header/assets/transactionReceive.svg";
import sendTx from "~/components/Header/assets/transactionSend.svg";
import { HeaderTxProps } from "~/components/Header/selector";
import Block from "~/components/layout/Block";
import Hairline from "~/components/layout/Hairline";
import Img from "~/components/layout/Image";
import Typography from "~/components/layout/Typography";
import { PAYMENT_ROUTE } from "~/routes";
import { RECIPIENT_FIELD } from "~/routes/sendPayment/components/FillPayment/SendCard";
import { history } from "~/store";
import { itemBackground, xs } from "~/theme/variables";
import { elipsify } from "~/utils/strings";

interface ItemProps extends WithStyles<typeof styles> {
  readonly item: HeaderTxProps;
  readonly phone: boolean;
  readonly lastOne: boolean;
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

const onVisitSendPayment = (address: string) => () => {
  history.push({
    pathname: PAYMENT_ROUTE,
    state: {
      [RECIPIENT_FIELD]: address,
    },
  });
};

const Msg = ({ amount, received, signer, recipient }: MsgProps) => {
  const signerWeight = received ? "semibold" : "regular";
  const recipientWeight = received ? "regular" : "semibold";

  const signerShort = elipsify(signer, 16);
  const recipientShort = elipsify(recipient, 16);

  return (
    <React.Fragment>
      {received ? (
        <Typography weight={signerWeight} inline pointer onClick={onVisitSendPayment(signer)}>
          {signerShort}
        </Typography>
      ) : (
        <Typography weight={signerWeight} inline>
          You
        </Typography>
      )}
      <Typography inline>{" sent "}</Typography>
      {received ? (
        <Typography weight={recipientWeight} inline>
          {"you "}
        </Typography>
      ) : (
        <Typography weight={recipientWeight} inline pointer onClick={onVisitSendPayment(recipient)}>
          {recipientShort}
        </Typography>
      )}
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
    <Typography weight="semibold" inline pointer onClick={onVisitSendPayment(recipient)}>
      >{recipient}
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
      lineHeight: 1.3,
      marginBottom: xs,
    },
  },
  item: {
    backgroundColor: itemBackground,
  },
});

const TxItem = ({ item, phone, classes, lastOne }: ItemProps) => {
  const { time, amount, received, signer, recipient, success } = item;

  const icon = success ? (received ? receiveTx : sendTx) : errorTx;
  const msg = success ? (
    <Msg received={received} amount={amount} signer={signer} recipient={recipient} />
  ) : (
    <MsgError amount={amount} recipient={recipient} />
  );

  return (
    <Block padding={phone ? "sm" : undefined} className={classes.item}>
      <ListItem>
        <Img src={icon} height={32} alt="Tx operation" />
        <ListItemText className={classes.msg} primary={msg} secondary={time.toLocaleString()} />
      </ListItem>
      {!lastOne && (
        <Block padding="md">
          <Hairline />
        </Block>
      )}
    </Block>
  );
};

export default withStyles(styles)(TxItem);
