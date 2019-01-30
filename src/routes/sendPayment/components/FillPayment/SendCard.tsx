import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import { background } from "~/theme/variables";


interface Props extends WithStyles<typeof styles> {
  readonly children: React.ReactNode;
}

const styles = createStyles({
  card: {
    backgroundColor: background,
    display: "flex",
    flexDirection: "column",
  },
});

const SendCard = ({ classes, children }: Props): JSX.Element => (
  <Block padding="lg" margin="lg" className={classes.card}>
    {children}
  </Block>
);

export default withStyles(styles)(SendCard);
