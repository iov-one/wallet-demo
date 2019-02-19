import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";
import { OpenHandler, openHoc, OpenType } from "~/components/hoc/OpenHoc";
import Block from "~/components/layout/Block";
import CircleImage from "~/components/layout/CircleImage";
import Hairline from "~/components/layout/Hairline";
import Img from "~/components/layout/Image";
import Spacer from "~/components/layout/Spacer";
import Typography from "~/components/layout/Typography";
import { amountToNumber } from "~/logic";
import { background, border } from "~/theme/variables";
import { getDate, getTime } from "~/utils/date";
import dropdownArrow from "../../assets/dropdownArrow.svg";
import dropdownArrowClose from "../../assets/dropdownArrowClose.svg";
import { calculateSender, getAddressPrefix, getTypeIcon, TransactionRowProps } from "../rowTransactionsBuilder";
import TransactionDetails from "../TransactionDetails";

const styles = createStyles({
  row: {
    display: "flex",
    flexDirection: "column",
  },
  rowContent: {
    display: "flex",
    alignItems: "center",
  },
  cell: {
    flex: "1 0 50px",
  },
});

interface Outer extends TransactionRowProps, WithStyles<typeof styles> {}

type Props = OpenType & OpenHandler & Outer;

const TransactionRow = ({ classes, tx, toggle, open }: Props): JSX.Element => (
  <Block padding="lg" className={classes.row}>
    <Block margin="md" />
    <Block className={classes.rowContent}>
      <CircleImage
        icon={getTypeIcon(tx)}
        circleColor={background}
        borderColor={border}
        alt="Transaction type"
        dia={40}
        width={24}
        height={24}
      />
      <Block className={classes.cell} padding="md">
        <Typography variant="subtitle2" weight="semibold" gutterBottom>
          {getAddressPrefix(tx)} {tx.received ? calculateSender(tx.signer) : calculateSender(tx.recipient)}
        </Typography>
        <Typography variant="subtitle2" weight="regular" color="secondary">
          {getTime(tx.time as Date)}
        </Typography>
      </Block>
      <Spacer order={1} />
      <Typography variant="subtitle2" weight="regular" color="secondary" className={classes.cell}>
        {getDate(tx.time as Date)}
      </Typography>
      <Spacer order={1} />
      <Typography variant="subtitle2" weight="regular" align="right" className={classes.cell}>
        {amountToNumber(tx.amount)} {tx.amount.tokenTicker}
      </Typography>
      <Block padding="xs" />
      <Img
        src={open ? dropdownArrowClose : dropdownArrow}
        width={16}
        height={10}
        alt="Sorting"
        onClick={toggle}
      />
    </Block>
    {open && <TransactionDetails tx={tx} />}
    <Block margin="md" />
    <Hairline />
  </Block>
);

export default withStyles(styles)(openHoc<Outer>(TransactionRow));
