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
    display: "inline-block",
  },
});

interface Props extends WithStyles<typeof styles> {
  readonly text: string;
}

const SectionComponent = ({ classes, text }: Props) => (
  <Block margin="xl" maxWidth={450} className={classes.content}>
    <Block margin="xxl" />
    <Block padding="xl">
      <Typography weight="light" variant="body2">
        {text}
      </Typography>
    </Block>
    <Block margin="xxl" />
  </Block>
);

export default withStyles(styles)(SectionComponent);
