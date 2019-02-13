import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import Img from "~/components/layout/Image";
import Typography from "~/components/layout/Typography";
import noTransactions from "../assets/noTransactions.svg";

const styles = createStyles({
  panel: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingTop: 100,
  },
});

interface Props extends WithStyles<typeof styles> {}

const ToolBox = ({ classes }: Props): JSX.Element => {
  return (
    <Block className={classes.panel}>
      <Img src={noTransactions} alt="No Transactions" />
      <Block margin="xl" />
      <Block padding="md">
        <Typography variant="subtitle1" weight="semibold" align="center">
          No transactions yet
        </Typography>
        <Block margin="xs" />
        <Typography variant="subtitle1" color="textSecondary" align="center">
          Make your first transaction and it will appear here
        </Typography>
      </Block>
    </Block>
  );
};

export default withStyles(styles)(ToolBox);
