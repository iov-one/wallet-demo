import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import Hairline from "~/components/layout/Hairline";
import Spacer from "~/components/layout/Spacer";
import Typography from "~/components/layout/Typography";
import { md } from "~/theme/variables";
import ColumnHeader from "./ColumnHeader";

const styles = createStyles({
  header: {
    display: "flex",
    alignItems: "center",
    margin: `${md} 0`,
  },
  title: {
    flex: "1 0 40px",
  }
});

interface Props extends WithStyles<typeof styles> {}

const TransactionsTableHeader = ({ classes }: Props) => (
  <React.Fragment>
    <Block padding="lg" className={classes.header}>
      <Typography variant="subtitle2" weight="semibold" className={classes.title}>
        Transactions
      </Typography>
      <Spacer order={1} />
      <ColumnHeader name="Date"/>
      <Spacer order={1} />
      <ColumnHeader name="Amount" alignRight/>
    </Block>
    <Hairline />
  </React.Fragment>
);

export default withStyles(styles)(TransactionsTableHeader);
