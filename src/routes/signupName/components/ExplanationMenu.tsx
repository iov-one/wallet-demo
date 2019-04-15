import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import Col from "~/components/layout/Col";
import RoundTextBox from "~/components/layout/RoundTextBox";
import Typography from "~/components/layout/Typography";

import Img from "~/components/layout/Image";
import arrow from "~/routes/signupName/assets/arrow.svg";

interface Props extends WithStyles<typeof styles> {}

const styles = createStyles({
  branding: {
    "& > h4": {
      lineHeight: "56px",
    },
  },
  roundBox: {},
});

const ExplanationMenu = ({ classes }: Props) => (
  <Col align="center">
    <Block margin="xxl" />
    <Block margin="xl" />
    <Block margin="xxl" className={classes.branding}>
      <Typography variant="h4" weight="extralight">
        Intuitive.
      </Typography>
      <Typography variant="h4" weight="extralight">
        Secure.
      </Typography>
      <Typography variant="h4" weight="extralight" color="primary">
        Simple.
      </Typography>
    </Block>
    <Block margin="md">
      <Typography variant="subtitle2" weight="semibold">
        Instead of having an address like this:
      </Typography>
    </Block>
    <RoundTextBox text="1DkyBEKt5S2G...AvnsRyHoYM" />
    <Block margin="md">
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
    <RoundTextBox text="john*iov" />
  </Col>
);

export default withStyles(styles)(ExplanationMenu);
