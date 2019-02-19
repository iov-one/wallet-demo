import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import Hairline from "~/components/layout/Hairline";
import Spacer from "~/components/layout/Spacer";
import Typography from "~/components/layout/Typography";
import {
  ORDER_ASC,
  ORDER_DESC,
  SortingStateProps,
  SortItem,
  TX_DATE_COLUMN,
  TX_TICKER_COLUMN,
} from "../sorting";
import SortMenu from "./SortMenu";

const styles = createStyles({
  header: {
    display: "flex",
    alignItems: "center",
  },
});

interface Props extends SortingStateProps, WithStyles<typeof styles> {
  readonly phoneHook: HTMLDivElement | null;
}

const sortItems: ReadonlyArray<SortItem> = [
  { name: "Date ascending", orderBy: TX_DATE_COLUMN, order: ORDER_ASC },
  { name: "Date descending", orderBy: TX_DATE_COLUMN, order: ORDER_DESC },
  { name: "Ticker ascending", orderBy: TX_TICKER_COLUMN, order: ORDER_ASC },
  { name: "Ticker descending", orderBy: TX_TICKER_COLUMN, order: ORDER_DESC },
];

const TransactionsTableHeader = ({ classes, ...restProps }: Props) => (
  <React.Fragment>
    <Block margin="md" />
    <Block padding="lg" className={classes.header}>
      <Typography variant="subtitle2" weight="semibold">
        Transactions
      </Typography>
      <Spacer order={1} />
      <SortMenu items={sortItems} {...restProps} />
    </Block>
    <Block margin="md" />
    <Hairline />
  </React.Fragment>
);

export default withStyles(styles)(TransactionsTableHeader);
