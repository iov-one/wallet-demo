import MuiButton, { ButtonProps } from "@material-ui/core/Button";
import * as React from "react";

interface Props extends ButtonProps {
  readonly minWidth?: number;
}

const calculateStyleBased = (minWidth: number) => ({
  minWidth: `${minWidth}px`,
});

const Button = ({ minWidth, ...props }: Props) => {
  const style = minWidth ? calculateStyleBased(minWidth) : undefined;

  return <MuiButton style={style} {...props} />;
};

export default Button;
