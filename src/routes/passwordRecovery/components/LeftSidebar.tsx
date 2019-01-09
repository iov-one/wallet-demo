import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import Spacer from "~/components/layout/Spacer";

const styles = createStyles({
  leftSide: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    backgroundImage: "linear-gradient(to top, #ecf4f3, #cdeae7)",
  },
});

interface Props extends WithStyles<typeof styles> {
  readonly children: React.ReactNode;
}

const LeftSidebar = ({ children, classes }: Props) => {
  return (
    <Block className={classes.leftSide}>
      <Spacer order={1} />
      {children}
      <Spacer order={1} />
    </Block>
  );
};

export default withStyles(styles)(LeftSidebar);
