import { Snackbar } from "@material-ui/core";
import { SnackbarOrigin } from "@material-ui/core/Snackbar";
import * as React from "react";
import ToastContent from "./ToastContent";

export enum ToastVariant {
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
  INFO = "info",
}

interface Props {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly message: string;
  readonly variant: ToastVariant;
}

export class Toast extends React.Component<Props> {
  public render(): JSX.Element {
    const { open, onClose, message, variant } = this.props;

    const anchorProps: SnackbarOrigin = {
      vertical: "bottom",
      horizontal: "right",
    };

    return (
      <Snackbar anchorOrigin={anchorProps} open={open} autoHideDuration={5000} onClose={onClose}>
        <ToastContent onClose={onClose} variant={variant} message={message} />
      </Snackbar>
    );
  }
}
