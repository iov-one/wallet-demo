import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import Typography from "~/components/layout/Typography";

interface Props extends WithStyles<typeof styles> {
  readonly text: string,
}

const DEFAULT_HEIGHT = "43px";

const styles = createStyles({
  roundBox: {
    height: DEFAULT_HEIGHT,
    borderRadius: "22px",
    opacity: 0.7,
    margin: "auto 0",
    boxShadow: "0 0 20px 0 rgba(237, 237, 237, 0.44)",
    backgroundImage: "linear-gradient(to top, #ffffff, rgba(255, 255, 255, 0.71))",
    "& > *": {
      lineHeight: DEFAULT_HEIGHT,
    },
  },
});

const RoundTextBox = ({ classes, text }: Props) => (
  <Block padding="xxl" margin="lg">
    <Block className={classes.roundBox} padding="xxl" align="center">
      <Typography variant="body1" weight="light">
        {text}
      </Typography>
    </Block>
  </Block>
);

export default withStyles(styles)(RoundTextBox);
