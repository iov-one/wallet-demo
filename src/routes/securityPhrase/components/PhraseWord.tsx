import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import Typography from "~/components/layout/Typography";
import { background, border } from "~/theme/variables";

interface Props extends WithStyles<typeof styles> {
  readonly word: string;
}

const styles = createStyles({
  phrase: {
    backgroundColor: background,
    borderRadius: 2,
    border: `1px solid ${border}`,
    boxShadow: "0 0 14px 0 #edeff4",
    boxSizing: "border-box",
  },
});

const PhraseWord = ({ word, classes }: Props) => (
  <Block padding="lg" margin="lg">
    <Block padding="md" className={classes.phrase}>
      <Block margin="sm" />
      <Typography variant="h6" color="textPrimary">
        {word}
      </Typography>
      <Block margin="sm" />
    </Block>
  </Block>
);

export default withStyles(styles)(PhraseWord);
