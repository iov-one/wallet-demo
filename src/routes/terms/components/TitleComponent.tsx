import * as React from "react";
import Block from "~/components/layout/Block";
import Typography from "~/components/layout/Typography";

interface Props {
  readonly text: string;
}

const TitleComponent = ({ text }: Props) => (
  <React.Fragment>
    <Block margin="xl" />
    <Typography variant="h5" align="center">
      {text}
    </Typography>
    <Block margin="lg" />
  </React.Fragment>
);

export default TitleComponent;
