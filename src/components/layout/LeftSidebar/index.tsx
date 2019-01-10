import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";
import Block, { BlockProps } from "~/components/layout/Block";

const styles = createStyles({
  leftSidebar: {
    display: "flex",
    flexDirection: "column",
    height: "100vh", // remember the left menu is under grid column for layouting the IOV icon
    backgroundImage: "linear-gradient(to top, #ecf4f3, #cdeae7)",
  },
});

interface Props extends BlockProps, WithStyles<typeof styles> {
  readonly children: React.ReactNode;
}

const LeftSidebar = ({ children, classes, ...props }: Props) => {
  return (
    <Block {...props} className={classes.leftSidebar}>
      {children}
    </Block>
  );
};

export default withStyles(styles)(LeftSidebar);
