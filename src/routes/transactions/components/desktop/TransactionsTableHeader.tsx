import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import Hairline from "~/components/layout/Hairline";
import Spacer from "~/components/layout/Spacer";
import Typography from "~/components/layout/Typography";
import { SortingStateProps, TX_DATE_COLUMN, TX_TICKER_COLUMN } from "../sorting";
import ColumnHeader from "./ColumnHeader";

const styles = createStyles({
  header: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    flex: "1 0 40px",
  },
});

interface Props extends SortingStateProps, WithStyles<typeof styles> {}

const TransactionsTableHeader = ({ classes, orderBy, order, onSort }: Props) => (
  <React.Fragment>
    <Block margin="md" />
    <Block padding="lg" className={classes.header}>
      <Typography variant="subtitle2" weight="semibold" className={classes.title}>
        Transactions
      </Typography>
      <Spacer order={1} />
      <ColumnHeader name={TX_DATE_COLUMN} orderBy={orderBy} order={order} onSort={onSort} />
      <Spacer order={1} />
      <ColumnHeader name={TX_TICKER_COLUMN} orderBy={orderBy} order={order} onSort={onSort} alignRight />
    </Block>
    <Block margin="md" />
    <Hairline />
  </React.Fragment>
);

export default withStyles(styles)(TransactionsTableHeader);
