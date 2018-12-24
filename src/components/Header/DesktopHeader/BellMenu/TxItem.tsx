import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import * as React from "react";
import receiveTx from "~/components/Header/assets/receive_transaction.svg";
import sendTx from "~/components/Header/assets/send_transaction.svg";
import Img from "~/components/layout/Image";
import Typography from "~/components/layout/Typography";
import { coinToString, TransNotificationInfo } from "~/logic";

interface ItemProps {
  readonly item: TransNotificationInfo;
}

interface MsgProps extends ItemProps {
  readonly amount: string;
}

const elipsify = (full: string, maxLength: number): string =>
  full.length <= maxLength ? full : full.slice(0, maxLength - 3) + "...";

const Msg = ({ item, amount }: MsgProps) => {
  const { received, signerAddr, signerName, recipientAddr, recipientName } = item;
  const signer = elipsify(signerName || signerAddr, 16);
  const recipient = elipsify(recipientName || recipientAddr, 16);

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
  const { time, transaction, received } = item;
  const { fractional, whole, tokenTicker } = transaction.amount;

  const icon = received ? receiveTx : sendTx;
  // TODO review sigFigs based on iov-core 0.10
  const coin = coinToString({ fractional, whole, sigFigs: 9 });
  const value = `${coin} ${tokenTicker}`;

  return (
    <ListItem>
      <Img src={icon} height={30} alt="Tx operation" />
      <ListItemText primary={<Msg item={item} amount={value} />} secondary={time.toLocaleString()} />
    </ListItem>
  );
};

export default TxItem;
