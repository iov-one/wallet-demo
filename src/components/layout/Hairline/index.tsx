import * as React from "react";
import { getSize, Size } from "~/theme/size";
import { border } from "~/theme/variables";

const calculateStyleFrom = (color?: string, margin?: Size) => ({
  width: "100%",
  height: "1px",
  backgroundColor: color || border,
  margin: `${getSize(margin)} 0px`,
});

interface Props {
  readonly margin?: Size;
  readonly color?: string;
}

const Hairline = ({ margin, color }: Props) => {
  const style = calculateStyleFrom(color, margin);
  console.log(border)
  return <div style={style} />;
};

export default Hairline;
