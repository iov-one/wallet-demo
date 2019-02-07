import { createStyles, Fab, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import CircleImage from "~/components/layout/CircleImage";
import Typography from "~/components/layout/Typography";
import { background, primary, xs } from "~/theme/variables";
import download from "../assets/download.svg";

const styles = createStyles({
  root: {
    width: "auto",    
    justifyContent: "left",
    textTransform: "inherit",
  },
  sizeSmall: {
    height: 32,
  },
  text: {
    paddingLeft: xs,
  },
  secondary: {
    backgroundColor: background
  }
});

interface Props extends WithStyles<typeof styles> {}

const ToolBox = ({classes}: Props): JSX.Element => {
  return (
    <Fab
      variant="extended"
      size="small"
      color="secondary"
      aria-label="Export as CSV"
      classes={classes}
    >
      <CircleImage icon={download} circleColor={primary} alt="Download" dia={32} />
      <Typography variant="subtitle2" weight="regular" className={classes.text}>Export as .CSV</Typography>
    </Fab>
  );
};

export default withStyles(styles)(ToolBox);
