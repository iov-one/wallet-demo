import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import Hairline from "~/components/layout/Hairline";
import Spacer from "~/components/layout/Spacer";
import Typography from "~/components/layout/Typography";
import { ColumnName, SortItem, SortOrder } from "../../common";
import SortMenu, { SortMenuProps } from "./SortMenu";

const styles = createStyles({
  header: {
    display: "flex",
    alignItems: "center",
  },
});

interface Props extends SortMenuProps, WithStyles<typeof styles> {
  readonly phoneHook: HTMLDivElement | null;
}

const sortItems: ReadonlyArray<SortItem> = [
  { name: "Date ascending", column: ColumnName.Date, order: SortOrder.Ascending },
  { name: "Date descending", column: ColumnName.Date, order: SortOrder.Descending },
  { name: "Ticker ascending", column: ColumnName.Amount, order: SortOrder.Ascending },
  { name: "Ticker descending", column: ColumnName.Amount, order: SortOrder.Descending },
];

const TransactionsTableHeader = ({ classes, phoneHook, onSetSortOrder }: Props) => (
  <React.Fragment>
    <Block margin="md" />
    <Block padding="lg" className={classes.header}>
      <Typography variant="subtitle2" weight="semibold">
        Transactions
      </Typography>
      <Spacer order={1} />
      <SortMenu phoneHook={phoneHook} items={sortItems} initial="" onSetSortOrder={onSetSortOrder} />
    </Block>
    <Block margin="md" />
    <Hairline />
  </React.Fragment>
);

export default withStyles(styles)(TransactionsTableHeader);
