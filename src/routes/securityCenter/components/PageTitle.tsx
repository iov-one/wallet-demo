import React from "react";

import { createStyles, withStyles, WithStyles } from "@material-ui/core";

// import Img from "~/components/layout/Image";
import Typography from "~/components/layout/Typography";

const styles = createStyles({
  title: {
    marginTop: 16,
    marginBottom: 24,
  },
});

const PageTitle = ({ classes }: WithStyles<typeof styles>): JSX.Element => (
  <React.Fragment>
    <Typography variant="h5" className={classes.title}>
      Security Center
    </Typography>
  </React.Fragment>
);

export default withStyles(styles)(PageTitle);
