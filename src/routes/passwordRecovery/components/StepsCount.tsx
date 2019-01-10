import * as React from "react";
import Block from "~/components/layout/Block";
import Typography from "~/components/layout/Typography";

interface Props {
  readonly stepNum: number;
}

const StepsCount = ({ stepNum }: Props) => (
  <React.Fragment>
    <Block margin="xxl" />
    <Block padding="xxl" margin="md">
    <Typography variant="subtitle1" color="textPrimary">
      Step {stepNum}/2
    </Typography>
  </Block>
  </React.Fragment>
);

export default StepsCount;
