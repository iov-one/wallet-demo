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

interface Props extends WithStyles<typeof styles> {}

const StepsCount = ({ classes }: Props) => (
  <Block className={classes.container} padding="xxl" margin="md">
    <Typography variant="subtitle1" color="textPrimary">
      Step 1/2
    </Typography>
  </Block>
);

export default withStyles(styles)(StepsCount);
