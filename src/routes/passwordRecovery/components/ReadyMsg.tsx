import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import Typography from "~/components/layout/Typography";
import { lg, xxl } from "~/theme/variables";

const styles = createStyles({
  noticeBox: {
    padding: lg,
    margin: xxl,
    textAlign: "center",
  },
});

const ReadyMsg = ({ classes }: WithStyles<typeof styles>) => {
  return (
    <Block className={classes.noticeBox}>
      <Typography variant="h4" weight="extralight">
        You are ready to go.
      </Typography>
    </Block>
  );
}
export default withStyles(styles)(ReadyMsg);
