import * as React from "react";
import Block from "~/components/layout/Block";
import Typography from "~/components/layout/Typography";

interface Props {
  readonly children: React.ReactNode;
  readonly variant?: "h5" | "h6";
}

const TitleComponent = ({ children, variant = "h6" }: Props) => (
  <React.Fragment>
    <Block margin="lg" />
    <Typography variant={variant}>{children}</Typography>
    <Block margin="lg" />
  </React.Fragment>
);

export default TitleComponent;
