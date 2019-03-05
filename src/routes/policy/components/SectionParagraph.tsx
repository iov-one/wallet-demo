import * as React from "react";
import Typography from "~/components/layout/Typography";

interface Props {
  readonly children: React.ReactNode;
}

const SectionParagraph = ({ children }: Props) => (
  <Typography weight="light" variant="body2" gutterBottom>
    {children}
  </Typography>
);

export default SectionParagraph;
