import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import { background, border } from "~/theme/variables";

const styles = createStyles({
  content: {
    backgroundColor: background,
    borderRadius: 5,
    border: `1px solid ${border}`,
    boxSizing: "border-box",
    display: "inline-block",
    wordWrap: "break-word",
    width: "100%",
  },
});

interface Props extends WithStyles<typeof styles> {
  readonly children: React.ReactNode;
}

const SectionComponent = ({ classes, children }: Props) => (
  <Block margin="xl" className={classes.content}>
    <Block margin="xl" />
    <Block padding="xl">{children}</Block>
    <Block margin="xl" />
  </Block>
);

export default withStyles(styles)(SectionComponent);
