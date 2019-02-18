import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import Hairline from "~/components/layout/Hairline";
import Spacer from "~/components/layout/Spacer";
import Typography from "~/components/layout/Typography";
import { ColumnName, SortingState } from "../../common";
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

interface Props extends WithStyles<typeof styles> {
  readonly onSort: (column: ColumnName) => () => void;
  readonly sortingState: SortingState;
}

const TransactionsTableHeader = ({ classes, onSort, sortingState }: Props) => (
  <React.Fragment>
    <Block margin="md" />
    <Block padding="lg" className={classes.header}>
      <Typography variant="subtitle2" weight="semibold" className={classes.title}>
        Transactions
      </Typography>
      <Spacer order={1} />
      <ColumnHeader name={ColumnName.Date} onSort={onSort} sortingState={sortingState} />
      <Spacer order={1} />
      <ColumnHeader name={ColumnName.Amount} onSort={onSort} sortingState={sortingState} alignRight />
    </Block>
    <Block margin="md" />
    <Hairline />
  </React.Fragment>
);

export default withStyles(styles)(TransactionsTableHeader);
