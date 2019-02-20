import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import Hairline from "~/components/layout/Hairline";
import Spacer from "~/components/layout/Spacer";
import Typography from "~/components/layout/Typography";
import { SortingStateProps } from "../sorting";
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



const TransactionsTableHeader = ({ classes, orderBy, order, ...restProps }: Props) => { 
  const initialName = buildNameFrom(orderBy, order) // this method should be in SortMenu

  return (
    <React.Fragment>
      <Block margin="md" />
      <Block padding="lg" className={classes.header}>
        <Typography variant="subtitle2" weight="semibold">
          Transactions
        </Typography>
        <Spacer order={1} />
        <SortMenu initialItem={initialName} {...restProps} />
      </Block>
      <Block margin="md" />
      <Hairline />
    </React.Fragment>
  )
}

export default withStyles(styles)(TransactionsTableHeader);
