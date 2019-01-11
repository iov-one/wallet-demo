import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import Img from "~/components/layout/Image";
import Typography from "~/components/layout/Typography";
import PageLogo from "../assets/pageLogo.svg";

interface Props extends WithStyles<typeof styles> {}

const styles = createStyles({
  logo: {
    alignSelf: "center",
  },
});

const PageTitle = ({ classes }: Props) => (
  <React.Fragment>
    <Block margin="xl" />
    <Img className={classes.logo} height="123" width="123" src={PageLogo} alt="Page Logo" />
    <Typography variant="h5" align="center">
      Advanced Security
    </Typography>
    <Block margin="lg" />
  </React.Fragment>
);

export default withStyles(styles)(PageTitle);
