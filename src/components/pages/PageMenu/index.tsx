import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import ErrorBoundary from "~/components/errors/ErrorBoundary";
import Header from "~/components/Header";
import Block from "~/components/layout/Block";
import Grid from "~/components/layout/Grid";
import GridItem from "~/components/layout/GridItem";
import { MatchMediaContext } from "~/context/MatchMediaContext";
import { backgroundPrimary } from "~/theme/variables";

export interface PageMenuProps {
  readonly renderProps?: (phone: boolean) => React.ReactNode;
  readonly children?: React.ReactNode;
  readonly phoneFullWidth?: boolean;
  readonly padding?: boolean;
}

interface Props extends PageMenuProps, WithStyles<typeof styles> {}

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

const PageMenu = ({ children, padding = true, renderProps, classes, phoneFullWidth = false }: Props) => (
  <MatchMediaContext.Consumer>
    {phone => {
      const paddingSize = phone && phoneFullWidth ? undefined : padding ? "lg" : undefined;

      return (
        <Grid className={classes.root}>
          <GridItem xs={12} variant="column" grow>
            <Header />
            <ErrorBoundary type="inner">
              <Block padding={paddingSize} className={classes.container}>
                {renderProps !== undefined ? renderProps(phone) : children}
              </Block>
            </ErrorBoundary>
          </GridItem>
        </Grid>
      );
    }}
  </MatchMediaContext.Consumer>
);

export default withStyles(styles)(PageMenu);
