import * as React from "react";
import Col from "~/components/layout/Col";
import Spacer from "~/components/layout/Spacer";

interface Props {
  readonly children: React.ReactNode;
}

const LeftColumn = ({ children }: Props) => {
  return (
    <Col>
      <Spacer order={1} />
      {children}
      <Spacer order={1} />
    </Col>
  );
};

export default LeftColumn;
