import * as React from "react";
import Block from "~/components/layout/Block";
import Typography from "~/components/layout/Typography";

interface Props {
  readonly primaryTitle: string;
  readonly secondaryTitle: string;
  readonly phone: boolean;
}

const TitleSection = ({ primaryTitle, secondaryTitle, phone }: Props) => (
  <Block padding={phone ? "lg" : "xxl"} maxWidth={450} margin="md">
    <Typography variant="h4" color="primary" inline>
      {`${primaryTitle} `}
    </Typography>
    <Typography variant="h4" inline>
      {secondaryTitle}
    </Typography>
  </Block>
);

export default TitleSection;
