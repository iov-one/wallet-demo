import React from "react";

import Img from "~/components/layout/Image";
import { WithStyles, createStyles, withStyles } from "@material-ui/core";

const styles = createStyles({
  badge: {
    maxWidth: 62,
    width: 62,
    height: 62,
  },
});

interface Props extends WithStyles<typeof styles> {
  readonly icon: string;
}


const IconBadge = ({ icon, classes }: Props): JSX.Element => (
  <Img className={classes.badge} src={icon} alt="Badge Icon" />
);

export default withStyles(styles)(IconBadge);