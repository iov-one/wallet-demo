import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import Typography from "~/components/layout/Typography";
import { background, border } from "~/theme/variables";

const styles = createStyles({
  content: {
    backgroundColor: background,
    borderRadius: 5,
    border: `1px solid ${border}`,
    boxSizing: "border-box",
  },
});
const ComingSoon = ({ classes }: WithStyles<typeof styles>) => (
  <Block margin="xl" maxWidth={450} className={classes.content}>
    <Block margin="xxl" />
    <Block padding="xl">
      <Typography align="center" weight="light" variant="h6">
        Extra security is something we’re working on, stay tuned!
      </Typography>
    </Block>
    <Block margin="xxl" />
  </Block>
);

export default withStyles(styles)(ComingSoon);
