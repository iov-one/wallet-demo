import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import Typography from "~/components/layout/Typography";
import { background, border, xl, xxl } from "~/theme/variables";

interface Props extends WithStyles<typeof styles> {
  readonly phrase: string;
}

const styles = createStyles({
  phrase: {
    backgroundColor: background,
    padding: `${xxl} ${xl}`,
    paddingBottom: xxl,
    borderRadius: 5,
    border: `1px solid ${border}`,
    boxSizing: "border-box",
  },
});

const ShowMnemonic = ({ phrase, classes }: Props) => (
  <Block margin="lg" maxWidth={450} className={classes.phrase}>
    <Typography variant="subtitle2" color="textPrimary">
      {phrase}
    </Typography>
  </Block>
);

export default withStyles(styles)(ShowMnemonic);
