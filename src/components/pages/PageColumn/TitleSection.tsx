import * as React from "react";
import Block from "~/components/layout/Block";
import Typography from "~/components/layout/Typography";

interface Props {
  readonly primaryTitle: string;
  readonly secondaryTitle: string;
}

const TitleSection = ({ primaryTitle, secondaryTitle }: Props) => (
  <Block padding="xxl" maxWidth={450} margin="md">
    <Typography variant="h4" color="primary" inline>
      {`${primaryTitle}\u00a0`}
    </Typography>
    <Typography variant="h4" inline>
      {secondaryTitle}
    </Typography>
  </Block>
);

export default TitleSection;
