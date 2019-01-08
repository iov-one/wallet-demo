import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import * as React from "react";
import Block from "~/components/layout/Block";
import Img from "~/components/layout/Image";
import { lg, mediumFontSize, xxl } from "~/theme/variables";

interface Props extends WithStyles<typeof styles> {
  readonly src: string;
  readonly alt: string;
  readonly text: string;
}

const styles = createStyles({
  empty: {
    marginBottom: xxl,
  },
  center: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  text: {
    marginBottom: lg,
    "& > span": {
      fontSize: mediumFontSize,
    },
  },
});

const EmptyListIcon = ({ classes, src, alt, text }: Props) => (
  <React.Fragment>
    <Block margin="md" />
    <ListItem className={classes.center}>
      <ListItemIcon className={classes.empty}>
        <Img src={src} alt={alt} height="42" />
      </ListItemIcon>
      <ListItemText primary={text} className={classes.text} />
    </ListItem>
  </React.Fragment>
);

export default withStyles(styles)(EmptyListIcon);
