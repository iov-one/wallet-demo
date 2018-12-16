import MuiButton, { ButtonProps } from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import * as React from "react";
import { Omit } from "react-redux";

interface Props extends Omit<ButtonProps, "variant"> {
  readonly minWidth?: number;
  readonly variant?: ButtonProps["variant"] | "continue";
  readonly spinner?: boolean;
}

const calculateStyleBased = (minWidth: number) => ({
  minWidth: `${minWidth}px`,
});

const spinnerStyle: React.CSSProperties = {
  marginRight: "12px",
};

const Button = ({ minWidth, variant, spinner = false, children, ...props }: Props) => {
  const muiVariant: ButtonProps["variant"] = variant && variant === "continue" ? "contained" : variant;
  const style = minWidth ? calculateStyleBased(minWidth) : undefined;

  return (
    <MuiButton style={style} variant={muiVariant} {...props}>
      {spinner && <CircularProgress style={spinnerStyle} size={22} color="inherit" />}
      {children}
      {variant === "continue" && <ArrowForwardIcon fontSize="small" />}
    </MuiButton>
  );
};

export default Button;
