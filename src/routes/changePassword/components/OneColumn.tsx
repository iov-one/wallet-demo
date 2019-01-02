import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import React from "react";
import Block from "~/components/layout/Block";
import Spacer from "~/components/layout/Spacer";

interface Props extends WithStyles<typeof styles> {
  readonly children: React.ReactNode;
}

const styles = createStyles({
  container: {
    display: "flex",
  },
  logo: {
    alignSelf: "center",
  },
  column: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    flexDirection: "column",
  },
});

const OneColumn = ({ children, classes }: Props) => (
  <Block className={classes.container} margin="md">
    <Spacer order={1} />
    <Block maxWidth={506} className={classes.column}>
      {children}
    </Block>
    <Spacer order={1} />
  </Block>
);

export default withStyles(styles)(OneColumn);
