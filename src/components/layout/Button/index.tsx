import Button, { ButtonProps } from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import * as React from "react";

const styles = {
  root: {
    borderRadius: 0,
  },
};

interface Props extends ButtonProps {
  readonly minWidth?: number;
}

const calculateStyleBased = (minWidth: number) => ({
  minWidth: `${minWidth}px`,
});

const IovButton = ({ minWidth, ...props }: Props) => {
  const style = minWidth ? calculateStyleBased(minWidth) : undefined;

  return <Button style={style} {...props} />;
};

export default withStyles(styles)(IovButton);
