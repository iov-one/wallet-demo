import React from "react";
import Block from "~/components/layout/Block";
import Typography from "~/components/layout/Typography";

interface Props {
  readonly onClick: () => void;
}

export const ExtraSecurity = ({ onClick }: Props): JSX.Element => (
  <React.Fragment>
    <Block margin="xs">
      <Typography variant="subtitle1" color="textPrimary">
        Extra security?
      </Typography>
    </Block>
    <Block margin="lg">
      <Typography variant="subtitle1" color="primary" underlined pointer onClick={onClick}>
        See advanced security
      </Typography>
    </Block>
  </React.Fragment>
);
