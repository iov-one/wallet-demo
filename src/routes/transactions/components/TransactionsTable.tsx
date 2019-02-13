import { createStyles, withStyles, WithStyles, Select, MenuItem } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import Hairline from "~/components/layout/Hairline";
import Img from "~/components/layout/Image";
import Spacer from "~/components/layout/Spacer";
import Typography from "~/components/layout/Typography";
import { background, md } from "~/theme/variables";
import sorting from "../assets/sorting.svg";
import TransactionRow from "./TransactionRow";

const styles = createStyles({
  panel: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: background,
  },
  column: {
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    alignItems: "center",
    margin: `${md} 0`,
  },
  footer: {
    display: "flex",
    alignItems: "center",
    margin: `${md} 0`,
  },
  row: {
    display: "flex",
    margin: `${md} 0`,
  },
  dropdownArrow: {
    marginTop: 10,
  }
});

interface Props extends WithStyles<typeof styles> { }

const TransactionsTable = ({ classes }: Props): JSX.Element => {
  return (
    <React.Fragment>
      <Block margin="lg" />
      <Block className={classes.panel}>
        <Block className={classes.column}>
          <Block padding="lg" className={classes.header}>
            <Typography variant="subtitle2" weight="semibold">
              Transactions
            </Typography>
            <Spacer order={1} />
            <Img src={sorting} width={24} height={24} alt="Sorting" />
          </Block>
          <Hairline />
          <TransactionRow type="send" address="alex*iov" amount="-0.01762507" symbol="BTC" time="1:00 am &#183; 20 Nov 2018" />
          <TransactionRow type="receive" address="cathy*iov" amount="+507" symbol="IOV" time="1:00 am &#183; 20 Nov 2018" />
          <TransactionRow type="reject" address="alex*iov" amount="-0.01762507" symbol="BTC" time="1:00 am &#183; 20 Nov 2018" />
          <TransactionRow type="receive" address="blockchain address" amount="+0.1757" symbol="ETH" time="1:00 am &#183; 20 Nov 2018" />
          <Block padding="lg" className={classes.footer}>
            <Typography variant="subtitle2" weight="regular">
              Rows per page
            </Typography>
            <Select
              inputProps={{
                name: 'rowsPerPage',
                id: 'age-simple',
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
            <Spacer order={1} />
            <Img src={sorting} width={24} height={24} alt="Sorting" />
          </Block>
        </Block>
      </Block>
    </React.Fragment>
  );
};

export default withStyles(styles)(TransactionsTable);
