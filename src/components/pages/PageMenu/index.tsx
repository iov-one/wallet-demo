import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import Header from "~/components/Header";
import Grid from "~/components/layout/Grid";
import GridItem from "~/components/layout/GridItem";
import { backgroundPrimary } from "~/theme/variables";

interface Props extends WithStyles<typeof styles> {
  readonly children: React.ReactNode;
}

const styles = createStyles({
  root: {
    backgroundColor: backgroundPrimary,
  },
});

const PageMenu = ({ children, classes }: Props) => (
  <Grid root className={classes.root}>
    <Header />
    <GridItem xs={12} variant="column" grow middle="xs">
      {children}
    </GridItem>
  </Grid>
);

export default withStyles(styles)(PageMenu);
