import { createStyles, IconButton, SnackbarContent, WithStyles, withStyles } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";
import classNames from "classnames";
import * as React from "react";
import Block from "~/components/layout/Block";
import Typography from "~/components/layout/Typography";
import { error, primary, secondary, temporaryError, xs } from "~/theme/variables";
import { ToastVariant } from "../";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles = createStyles({
  success: {
    //backgroundColor: primary,
    fontColor: primary,
  },
  error: {
    //backgroundColor: error,
    fontColor: error,
  },
  info: {
    //backgroundColor: secondary,
    fontColor: secondary,
  },
  warning: {
    //backgroundColor: temporaryError,
    fontColor: temporaryError,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: xs,
  },
  message: {
    display: "flex",
    alignItems: "center",
  },
  close: {
    padding: xs,
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
        <Block className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          <Typography variant="subtitle1">
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
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
    />
  );
};

export default withStyles(styles)(ToastContent);
