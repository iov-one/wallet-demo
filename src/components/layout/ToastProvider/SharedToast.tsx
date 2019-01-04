import * as React from "react";
import { Toast } from "~/components/layout/Toast";
import { ToastConsumer, ToastContextInterface } from "./index";

const SharedToast = () => (
  <ToastConsumer>
    {({ open, message, onClose, variant }: ToastContextInterface) => {
      return <Toast open={open} onClose={onClose} message={message} variant={variant} />;
    }}
  </ToastConsumer>
);

export default SharedToast;
