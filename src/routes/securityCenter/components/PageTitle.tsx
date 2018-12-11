import React from "react";

import { createStyles, withStyles, WithStyles } from "@material-ui/core";

import Img from "~/components/layout/Image";
import Typography from "~/components/layout/Typography";

import PageLogo from "../assets/pageLogo.svg";

const styles = createStyles({
  image: {
    marginTop: 34,
  },
  title: {
    marginBottom: 24,
  },
});

const PageTitle = ({ classes }: WithStyles<typeof styles>): JSX.Element => (
  <React.Fragment>
    <Img className={classes.image} src={PageLogo} alt="Page Logo" />
    <Typography variant="h5" className={classes.title}>
      Security Center
    </Typography>
  </React.Fragment>
);

export default withStyles(styles)(PageTitle);
