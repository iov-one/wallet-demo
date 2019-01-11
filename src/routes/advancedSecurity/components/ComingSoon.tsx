import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import Typography from "~/components/layout/Typography";
import { background, border, xl, xxl } from "~/theme/variables";

const styles = createStyles({
  content: {
    backgroundColor: background,
    padding: `${xxl} ${xl}`,
    paddingBottom: xxl,
    borderRadius: 5,
    border: `1px solid ${border}`,
    boxSizing: "border-box",
  },
});
const ComingSoon = ({classes}: WithStyles<typeof styles>) => (
  <React.Fragment>
    <Block margin="lg" maxWidth={450} className={classes.content}>
      <Typography align="center" weight="light" variant="h6">
        Extra security is something we’re working on, stay tuned!
      </Typography>
    </Block>
    <Block margin="lg" />
  </React.Fragment>
);

export default withStyles(styles)(ComingSoon);
