import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import Header from "~/components/Header";
import Block from "~/components/layout/Block"
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
  container: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const PageMenu = ({ children, classes }: Props) => (
  <React.Fragment>
    <Grid root className={classes.root}>
      <GridItem xs={12} variant="column" grow>
        <Header />
        <Block className={classes.container} >
          {children}
        </Block>
      </GridItem>
    </Grid>
  </React.Fragment>
);

export default withStyles(styles)(PageMenu);
