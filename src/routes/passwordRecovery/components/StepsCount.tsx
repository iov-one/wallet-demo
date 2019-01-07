import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import Typography from "~/components/layout/Typography";
import { xxl } from "~/theme/variables";

const styles = createStyles({
  container: {
    paddingTop: xxl,
  },
});

interface Props extends WithStyles<typeof styles> {
  readonly stepNum: number;
}

const StepsCount = ({ classes, stepNum }: Props) => (
  <Block className={classes.container} padding="xxl" margin="md">
    <Typography variant="subtitle1" color="textPrimary">
      Step {stepNum}/2
    </Typography>
  </Block>
);

export default withStyles(styles)(StepsCount);
