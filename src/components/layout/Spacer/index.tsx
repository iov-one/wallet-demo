import * as React from "react";

const buildSpaceFrom = (order: number): React.CSSProperties => ({
  flexGrow: order,
});

interface Props {
  readonly order: number;
}

const Spacer = ({ order }: Props) => {
  const style = buildSpaceFrom(order);

  return <div style={style} />;
};

export default Spacer;
