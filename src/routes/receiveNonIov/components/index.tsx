import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import ReceiveIOVForm from "./ReceiveIOVForm";

import { TickerWithAddress } from "../container/selector";

const styles = createStyles({
  container: {
    display: "flex",
    justify: {
      content: "center",
    },
  },
});

interface Props extends WithStyles<typeof styles> {
  readonly tickersList: ReadonlyArray<TickerWithAddress>;
}

const ReceiveNonIov = ({ tickersList, classes }: Props): JSX.Element => (
  <Block className={classes.container}>
    <ReceiveIOVForm tickersList={tickersList} />
  </Block>
);

export default withStyles(styles)(ReceiveNonIov);
