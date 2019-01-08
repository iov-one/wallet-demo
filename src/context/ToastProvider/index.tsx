import * as React from "react";
import { Toast } from "./Toast";

export enum ToastVariant {
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
  INFO = "info",
}

const SharedToast = () => (
  <ToastConsumer>
    {({ open, message, onClose, variant }: ToastContextInterface) => {
      return <Toast open={open} onClose={onClose} message={message} variant={variant} />;
    }}
  </ToastConsumer>
);

export interface ToastContextInterface {
  readonly showToast: (message: string, variant: ToastVariant) => void;
  readonly onClose: () => void;
  readonly open: boolean;
  readonly message: string;
  readonly variant: ToastVariant;
}

const ToastContext = React.createContext<ToastContextInterface>({
  showToast: (message: string, variant: ToastVariant) => ({ message, variant }),
  onClose: () => null,
  open: false,
  message: "",
  variant: ToastVariant.INFO,
});

interface Props {
  readonly children: React.ReactNode;
}

interface State {
  readonly open: boolean;
  readonly message: string;
  readonly variant: ToastVariant;
}

export class ToastProvider extends React.Component<Props, State> {
  public readonly state = {
    open: false,
    message: "",
    variant: ToastVariant.INFO,
  };

  public readonly showToast = (message: string, variant: ToastVariant) => {
    this.setState({
      message,
      variant,
      open: true,
    });
  };

  public readonly closeToast = () => {
    this.setState({
      message: "",
      open: false,
    });
  };

  public render(): JSX.Element {
    const { children } = this.props;

    return (
      <ToastContext.Provider
        value={{
          showToast: this.showToast,
          onClose: this.closeToast,
          open: this.state.open,
          message: this.state.message,
          variant: this.state.variant,
        }}
      >
        <SharedToast />
        {children}
      </ToastContext.Provider>
    );
  }
}

export const ToastConsumer = ToastContext.Consumer;
