import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import * as React from "react";
import Img from "~/components/layout/Image";

interface Props extends WithStyles<typeof styles> {
  readonly src: string;
  readonly alt: string;
  readonly text: string;
}

const styles = createStyles({
  empty: {
    height: "120px",
  },
  center: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
});

const EmptyListIcon = ({ classes, src, alt, text }: Props) => (
  <ListItem className={classes.center}>
    <ListItemIcon className={classes.empty}>
      <Img src={src} alt={alt} />
    </ListItemIcon>
    <ListItemText primary={text} />
  </ListItem>
);

export default withStyles(styles)(EmptyListIcon);
