import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import Grid from "~/components/layout/Grid";
import GridItem from "~/components/layout/GridItem";
import Img from "~/components/layout/Image";
import logo from "~/routes/signup/assets/logo.svg";

interface Props extends WithStyles<typeof styles> {
  readonly leftMenu: React.ReactNode;
  readonly children: JSX.Element;
}

const ref = React.createRef<GridItem>();

const styles = createStyles({
  logo: {
    bottom: "80px",
    position: "relative",
    display: "flex",
    margin: "0 auto",
  },
});

const Layout = ({ children, classes, leftMenu }: Props): JSX.Element => (
  <Grid>
    <GridItem xs={0} sm={4} ref={ref} maxwidth="sm">
      <Block overlap>
        {leftMenu}
        <Img src={logo} alt="Logo" className={classes.logo} />
      </Block>
    </GridItem>
    <GridItem xs={12} sm={8} growSm={4} growElem={ref} variant="column">
      {children}
    </GridItem>
  </Grid>
);

export default withStyles(styles)(Layout);
