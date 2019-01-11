import * as React from "react";
import Block from "~/components/layout/Block";
import Typography from "~/components/layout/Typography";

export default (): JSX.Element => {
  return (
    <Block padding="xxl">
      <Typography variant="h4" color="textPrimary">
        Profile not found
      </Typography>
    </Block>
  );
};
