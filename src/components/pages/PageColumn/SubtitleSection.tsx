import * as React from "react";
import Block from "~/components/layout/Block";
import Typography from "~/components/layout/Typography";

interface Props {
  readonly text: string;
  readonly phone: boolean;
}

const SubtitleSection = ({ text, phone }: Props) => (
  <Block padding={phone ? "lg" : "xxl"} margin="xl">
    <Typography variant="h6" weight="light" color="secondary">
      {text}
    </Typography>
  </Block>
);

export default SubtitleSection;
