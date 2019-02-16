import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";
import { OpenHandler, openHoc, OpenType } from "~/components/hoc/OpenHoc";
import Block from "~/components/layout/Block";
import CircleImage from "~/components/layout/CircleImage";
import Hairline from "~/components/layout/Hairline";
import Img from "~/components/layout/Image";
import Spacer from "~/components/layout/Spacer";
import Typography from "~/components/layout/Typography";
import { background, border, md } from "~/theme/variables";
import { getDate, getTime } from "~/utils/date";
import dropdownArrow from "../../assets/dropdownArrow.svg";
import { getAddressPrefix, getTypeIcon, TransactionRowProps } from "../../common";
import TransactionDetails from "../TransactionDetails";

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

interface Outer extends TransactionRowProps, WithStyles<typeof styles> {}

type Props = OpenType & OpenHandler & Outer;

const TransactionRow = ({
  classes,
  type,
  address,
  amount,
  symbol,
  time,
  note,
  toggle,
  open,
}: Props): JSX.Element => (
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
      <Img
        src={dropdownArrow}
        className={classes.dropdownArrow}
        width={16}
        height={10}
        alt="Sorting"
        onClick={toggle}
      />
    </Block>
    {open && <TransactionDetails address={address} note={note} />}
    <Hairline />
  </Block>
);

export default withStyles(styles)(openHoc<Outer>(TransactionRow));
