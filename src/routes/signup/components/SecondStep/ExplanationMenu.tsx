import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import RoundTextBox from "~/components/layout/RoundTextBox";
import Typography from "~/components/layout/Typography";

import Img from "~/components/layout/Image";
import arrow from "~/routes/signup/assets/arrow.svg";

interface Props extends WithStyles<typeof styles> {}

const styles = createStyles({
  background: {
    height: "100vh", // remember the left menu is under grid column for layouting the IOV icon
    display: "flex",
    flexDirection: "column",
    backgroundImage: "linear-gradient(to bottom, #ecf4f3, #cdeae7)",
  },
  branding: {
    "& > h4": {
      lineHeight: "56px",
    },
  },
  roundBox: {},
});

const ExplanationMenu = ({ classes }: Props) => (
  <Block align="center" className={classes.background}>
    <Block margin="xxl" />
    <Block margin="xxl" />
    <Block margin="md" />
    <Block margin="xxl" className={classes.branding}>
      <Typography variant="h4">Intuitive.</Typography>
      <Typography variant="h4">Secure.</Typography>
      <Typography variant="h4" color="primary">
        Simple.
      </Typography>
    </Block>
    <Block margin="sm">
      <Typography variant="subtitle2" weight="semibold">
        Instead of having an address like this:
      </Typography>
    </Block>
    <RoundTextBox text="1DkyBEKt5S2G...AvnsRyHoYM" />
    <Block margin="sm">
      <Img src={arrow} alt="Account transformation" />
    </Block>
    <Block margin="sm">
      <Typography variant="subtitle2" weight="semibold" inline>
        {"For\u00a0"}
      </Typography>
      <Typography variant="subtitle2" color="primary" weight="semibold" inline>
        {"IOV users\u00a0"}
      </Typography>
      <Typography variant="subtitle2" weight="semibold" inline>
        we provide an address like this:
      </Typography>
    </Block>
    <RoundTextBox text="John*iov" />
  </Block>
);

export default withStyles(styles)(ExplanationMenu);
