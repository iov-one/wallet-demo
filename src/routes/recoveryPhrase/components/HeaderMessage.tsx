import * as React from "react";
import Block from "~/components/layout/Block";
import Typography from "~/components/layout/Typography";

export const HeaderMessage = () => (
  <React.Fragment>
    <Block margin="xxl" />
    <Block padding="xxl" margin="md">
      <Typography variant="subtitle1" color="textPrimary">
        Your backup phrase
      </Typography>
    </Block>
  </React.Fragment>
);
