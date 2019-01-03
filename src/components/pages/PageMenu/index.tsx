import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import Header from "~/components/Header";
import Block from "~/components/layout/Block";
import Grid from "~/components/layout/Grid";
import GridItem from "~/components/layout/GridItem";
import { MatchMediaContext } from "~/context/MatchMediaContext";
import { backgroundPrimary } from "~/theme/variables";

interface Props extends WithStyles<typeof styles> {
  readonly children: React.ReactNode;
  readonly phoneFullWidth?: boolean;
}

const styles = createStyles({
  root: {
    backgroundColor: backgroundPrimary,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
});

const PageMenu = ({ children, classes, phoneFullWidth = false }: Props) => (
  <MatchMediaContext.Consumer>
    {phone => {
      const padding = phone && phoneFullWidth ? undefined : "lg";

      return (
        <Grid className={classes.root}>
          <GridItem xs={12} variant="column" grow>
            <Header />
            <Block padding={padding} className={classes.container}>
              {typeof children === "function" ? children(phone) : children}
            </Block>
          </GridItem>
        </Grid>
      );
    }}
  </MatchMediaContext.Consumer>
);

export default withStyles(styles)(PageMenu);
