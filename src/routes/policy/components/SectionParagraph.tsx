import * as React from "react";
import Typography from "~/components/layout/Typography";

interface Props {
  readonly children: React.ReactNode;
  readonly inline?: boolean;
  readonly strong?: boolean;
}

const SectionParagraph = ({ children, inline, strong }: Props) => (
  <Typography weight={strong ? "semibold" : "light"} variant="body2" inline={inline} gutterBottom>
    {children}
  </Typography>
);

export default SectionParagraph;
