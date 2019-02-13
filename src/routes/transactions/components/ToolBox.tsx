import { createStyles, Fab, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import CircleImage from "~/components/layout/CircleImage";
import Typography from "~/components/layout/Typography";
import { background, border, primary, xl, xs } from "~/theme/variables";
import download from "../assets/download.svg";

const styles = createStyles({
  root: {
    width: 150,
    justifyContent: "left",
    textTransform: "inherit",
  },
  sizeSmall: {
    height: xl,
  },
  text: {
    paddingLeft: xs,
  },
  secondary: {
    backgroundColor: background,
    padding: 0,
    boxShadow: "none",
    border: `1px solid ${border}`,
    "&:hover": {
      background: background,
    },
  },
  panel: {
    height: 64,
    display: "flex",
    alignItems: "center",
    backgroundColor: background,
  },
});

interface Props extends WithStyles<typeof styles> {
  readonly phone: boolean;
}

const ToolBox = ({ classes, phone }: Props): JSX.Element => {
  const fabClasses = {
    secondary: classes.secondary,
    root: classes.root,
    sizeSmall: classes.sizeSmall,    
  }
  
  return (
    <Block className={classes.panel} padding="lg">
      {!phone && <Block maxWidth={176} grow />}
      <Fab variant="extended" size="small" color="secondary" aria-label="Export as CSV" classes={fabClasses}>
        <CircleImage icon={download} circleColor={primary} alt="Download" dia={32} width={16} height={16} />
        <Typography variant="subtitle2" weight="regular" className={classes.text}>
          Export as .CSV
        </Typography>
      </Fab>
    </Block>
  );
};

export default withStyles(styles)(ToolBox);
