import { Snackbar } from "@material-ui/core";
import * as React from "react";
import ToastContent from "./components/ToastContent";

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

export const Toast = ({ open, onClose, message, variant }: Props) => (
  <Snackbar
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    open={open}
    onClose={onClose}
  >
    <ToastContent onClose={onClose} variant={variant} message={message} />
  </Snackbar>
);
