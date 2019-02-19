import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import ReceiveIOVForm from "./ReceiveIOVForm";

const styles = createStyles({
  container: {
    display: "flex",
    justify: {
      content: "center",
    },
  },
});

interface Props extends WithStyles<typeof styles> {
  readonly iovAddress: string;
}

const ReceiveIov = ({ iovAddress, classes }: Props): JSX.Element => (
  <Block className={classes.container}>
    <ReceiveIOVForm iovAddress={iovAddress} />
  </Block>
);

export default withStyles(styles)(ReceiveIov);