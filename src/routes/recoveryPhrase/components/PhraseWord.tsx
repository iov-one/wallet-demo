import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import Typography from "~/components/layout/Typography";
import { background, border, md, sm } from "~/theme/variables";

interface Props extends WithStyles<typeof styles> {
  readonly word: string;
}

const styles = createStyles({
  phrase: {
    backgroundColor: background,
    padding: `${sm} ${md}`,
    borderRadius: 2,
    border: `1px solid ${border}`,
    boxShadow: "0 0 14px 0 #edeff4",
    boxSizing: "border-box",
    marginLeft: md,
  },
});

const PhraseWord = ({ word, classes }: Props) => (
  <Block padding="md" margin="lg">
    <Block className={classes.phrase}>
      <Typography variant="h6" color="textPrimary">
        {word}
      </Typography>
    </Block>
  </Block>
);

export default withStyles(styles)(PhraseWord);
