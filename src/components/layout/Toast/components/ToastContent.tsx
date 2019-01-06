import { createStyles, IconButton, SnackbarContent, WithStyles, withStyles } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import classNames from "classnames";
import * as React from "react";
import Block from "~/components/layout/Block";
import Image from "~/components/layout/Image";
import Typography from "~/components/layout/Typography";
import { error, lg, primary, secondary, temporaryError, xs } from "~/theme/variables";
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
    fontSize: 20,
  },
  iconVariant: {},
  message: {
    alignItems: "center",
    display: "flex",
  },
  close: {
    padding: xs,
  },
  iconBackground: {
    backgroundColor: "#FCFCFC",
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
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} nativeColor="#d5d9db" />
        </IconButton>,
      ]}
    />
  );
};

export default withStyles(styles)(ToastContent);
