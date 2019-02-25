import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import Img from "~/components/layout/Image";
import Typography from "~/components/layout/Typography";

interface Props extends WithStyles<typeof styles> {}

const styles = createStyles({
  logo: {
    alignSelf: "center",
  },
});

const PageTitle = ({ classes }: Props) => (
  <React.Fragment>
    <Block margin="xl" />
    <Img className={classes.logo} height="123" width="123" alt="Page Terms" />
    <Typography variant="h5" align="center">
      Terms
    </Typography>
    <Block margin="lg" />
  </React.Fragment>
);

export default withStyles(styles)(PageTitle);
