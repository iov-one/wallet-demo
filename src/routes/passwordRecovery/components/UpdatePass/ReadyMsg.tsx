import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import Typography from "~/components/layout/Typography";
import { lg, xxl } from "~/theme/variables";
import LeftColumn from "../LeftColumn";

const styles = createStyles({
  message: {
    padding: lg,
    margin: xxl,
    textAlign: "center",
  },
});

const ReadyMsg = ({ classes }: WithStyles<typeof styles>) => {
  return (
    <LeftColumn>
      <Block className={classes.message}>
        <Typography variant="h4" weight="extralight">
          You are ready to go.
        </Typography>
      </Block>
    </LeftColumn>
  );
};
export default withStyles(styles)(ReadyMsg);
