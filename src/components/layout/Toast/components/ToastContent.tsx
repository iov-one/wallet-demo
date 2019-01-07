import { createStyles, IconButton, SnackbarContent, WithStyles, withStyles } from "@material-ui/core";
//import CloseIcon from "@material-ui/icons/Close";
import classNames from "classnames";
import * as React from "react";
import Block from "~/components/layout/Block";
import Image from "~/components/layout/Image";
import Typography from "~/components/layout/Typography";
import { error, lg, primary, secondary, temporaryError } from "~/theme/variables";
import CloseIcon from "../assets/close.svg";
import ErrorIcon from "../assets/error.svg";
import SuccessIcon from "../assets/success.svg";
import { ToastVariant } from "../index";

const variantIcon = {
  success: SuccessIcon,
  warning: ErrorIcon,
  error: ErrorIcon,
  info: SuccessIcon,
};

const styles = createStyles({
  success: {
    color: primary,
  },
  error: {
    color: error,
  },
  info: {
    color: secondary,
  },
  warning: {
    color: temporaryError,
  },
  icon: {
    fontSize: 30,
  },
  iconVariant: {},
  message: {
    alignItems: "center",
    display: "flex",
  },
  iconBackground: {
    backgroundColor: "#f5f7f9",
    height: 60,
    width: 60,
    borderRadius: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: lg,
  },
});

interface Props extends WithStyles<typeof styles> {
  readonly className?: string;
  readonly message: string;
  readonly onClose: () => void;
  readonly variant: ToastVariant;
}

const ToastContent = ({ classes, className, message, onClose, variant }: Props) => {
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      message={
        <Block className={classes.message} grow>
          <div className={classes.iconBackground}>
            <Image src={Icon} alt="Toast icon" width={lg} height={lg} />
          </div>

          <Typography variant="subtitle1" className={classes[variant]}>
            {message}
          </Typography>
        </Block>
      }
      action={[
        <IconButton key="close" aria-label="Close" color="secondary" onClick={onClose}>
          <Image src={CloseIcon} alt="Close" width={20} height={20} />
        </IconButton>,
      ]}
    />
  );
};

export default withStyles(styles)(ToastContent);
