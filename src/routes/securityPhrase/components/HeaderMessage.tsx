import * as React from "react";
import Block from "~/components/layout/Block";
import Typography from "~/components/layout/Typography";
import { MatchMediaContext } from "~/context/MatchMediaContext";

export const HeaderMessage = () => (
  <MatchMediaContext.Consumer>
    {phone => (
      <React.Fragment>
        <Block margin="xxl" />
        <Block padding={phone ? "lg" : "xxl"} margin="md">
          <Typography variant="subtitle1" color="textPrimary">
            Your recovery phrase
          </Typography>
        </Block>
      </React.Fragment>
    )}
  </MatchMediaContext.Consumer>
);
