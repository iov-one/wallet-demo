import { BnsConnection } from "@iov/bns";
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
import dropdownArrow from "~/routes/transactions/assets/dropdownArrow.svg";
import dropdownArrowClose from "~/routes/transactions/assets/dropdownArrowClose.svg";
import { background, border } from "~/theme/variables";
import { getDate, getTime } from "~/utils/date";
import {
  calculateSender,
  DEFAULT_ADDRESS,
  getAddressPrefix,
  getTypeIcon,
  TxTableRowProps,
} from "../rowTxBuilder";
import TxDetails from "../TxDetails";

const styles = createStyles({
  row: {
    display: "flex",
    flexDirection: "column",
  },
  rowContent: {
    display: "flex",
  },
  dropdownArrow: {
    marginTop: 10,
  },
  sectionName: {
    overflowWrap: "break-word",
  },
  txData: {
    maxWidth: "calc(100% - 100px)",
  },
});

interface Outer extends TxTableRowProps, WithStyles<typeof styles> {
  readonly connection: BnsConnection;
}

type Props = OpenType & OpenHandler & Outer;

interface State {
  readonly name: string;
}

class TxTableRowPhone extends React.Component<Props, State> {
  public readonly state = {
    name: DEFAULT_ADDRESS,
  };

  public async componentDidMount(): Promise<void> {
    const { connection, tx } = this.props;
    const address = tx.received ? tx.signer : tx.recipient;
    const name = await calculateSender(connection, address);
    this.setState({ name });
  }

  public render(): JSX.Element {
    const { classes, tx, toggle, open } = this.props;

    return (
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
          <Block padding="md" className={classes.txData}>
            <Typography variant="subtitle2" weight="semibold" className={classes.sectionName}>
              {getAddressPrefix(tx)} {this.state.name}
            </Typography>
            <Block margin="md" />
            <Typography variant="subtitle2" weight="regular">
              {amountToNumber(tx.amount)} {tx.amount.tokenTicker}
            </Typography>
            <Block margin="md" />
            <Typography variant="subtitle2" weight="regular" color="secondary">
              {getTime(tx.time as Date)} &#183; {getDate(tx.time as Date)}
            </Typography>
          </Block>
          <Spacer order={1} />
          <Img
            src={open ? dropdownArrowClose : dropdownArrow}
            className={classes.dropdownArrow}
            width={16}
            height={10}
            alt="Sorting"
            onClick={toggle}
          />
        </Block>
        {open && <TxDetails tx={tx} />}
        <Block margin="md" />
        <Hairline />
      </Block>
    );
  }
}

export default withStyles(styles)(openHoc<Outer>(TxTableRowPhone));
