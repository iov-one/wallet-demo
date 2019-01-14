import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import Spacer from "~/components/layout/Spacer";
import PageMenu, { PageMenuProps } from "~/components/pages/PageMenu";

interface Props extends PageMenuProps, WithStyles<typeof styles> {
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

const PageMenuColumn = ({ children, classes, ...props }: Props) => (
  <PageMenu {...props}>
    <Block className={classes.container} margin="md">
      <Spacer order={1} />
      <Block maxWidth={450} className={classes.column}>
        {children}
      </Block>
      <Spacer order={1} />
    </Block>
  </PageMenu>
);

export default withStyles(styles)(PageMenuColumn);
