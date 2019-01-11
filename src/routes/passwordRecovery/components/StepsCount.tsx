import * as React from "react";
import Block from "~/components/layout/Block";
import Typography from "~/components/layout/Typography";
import { MatchMediaContext } from "~/context/MatchMediaContext";

interface Props {
  readonly stepNum: number;
}

const StepsCount = ({ stepNum }: Props) => (
  <MatchMediaContext.Consumer>
    {phone => (
      <React.Fragment>
        <Block margin="xxl" />
        <Block padding={phone ? "lg" : "xxl"} margin="md">
          <Typography variant="subtitle1" color="textPrimary">
            Step {stepNum}/2
          </Typography>
        </Block>
      </React.Fragment>
    )}
  </MatchMediaContext.Consumer>
);

export default StepsCount;
