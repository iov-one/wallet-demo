import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import CircleImage from "~/components/layout/CircleImage";
import Hairline from "~/components/layout/Hairline";
import Img from "~/components/layout/Image";
import Spacer from "~/components/layout/Spacer";
import Typography from "~/components/layout/Typography";
import { background, border, md } from "~/theme/variables";
import { getDate, getTime } from "~/utils/date";
import dropdownArrow from "../../assets/dropdownArrow.svg";
import fromAddress from "../../assets/fromAddress.svg";
import toAddress from "../../assets/toAddress.svg";
import toAddressRejected from "../../assets/toAddressRejected.svg";

const styles = createStyles({
  row: {
    display: "flex",

    flexDirection: "column",
  },
  rowContent: {
    display: "flex",
    margin: `${md} 0`,
  },
  dropdownArrow: {
    marginTop: 10,
  },
});

type txType = "send" | "receive" | "reject";

interface Props extends WithStyles<typeof styles> {
  readonly type: txType;
  readonly address: string;
  readonly amount: string;
  readonly symbol: string;
  readonly time: Date; //TODO: change to Date
}

const getTypeIcon = (type: txType): string => {
  switch (type) {
    case "send":
      return toAddress;
    case "reject":
      return toAddressRejected;
    case "receive":
      return fromAddress;
  }
};

const getAddressPrefix = (type: txType): string => {
  switch (type) {
    case "send":
      return "To";
    case "reject":
      return "To";
    case "receive":
      return "From";
  }
};
const TransactionRow = ({ classes, type, address, amount, symbol, time }: Props): JSX.Element => (
  <Block padding="lg" className={classes.row}>
    <Block className={classes.rowContent}>
      <CircleImage
        icon={getTypeIcon(type)}
        circleColor={background}
        borderColor={border}
        alt="Transaction type"
        dia={40}
        width={24}
        height={24}
      />
      <Block padding="md">
        <Typography variant="subtitle2" weight="semibold">
          {getAddressPrefix(type)} {address}
        </Typography>
        <Block margin="md" />
        <Typography variant="subtitle2" weight="regular">
          {amount} {symbol}
        </Typography>
        <Block margin="md" />
        <Typography variant="subtitle2" weight="regular" color="secondary">
          {getTime(time)} &#183; {getDate(time)}
        </Typography>
      </Block>
      <Spacer order={1} />
      <Img src={dropdownArrow} className={classes.dropdownArrow} width={16} height={10} alt="Sorting" />
    </Block>
    <Hairline />
  </Block>
);

export default withStyles(styles)(TransactionRow);
