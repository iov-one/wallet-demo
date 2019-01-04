import * as React from 'react'

const ToastContext = React.createContext({
  openToast: undefined,
  closeToast: undefined,
  toastIsOpen: false,
  message: '',
  variant: 'info',
});

export enum ToastVariant {
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
  INFO = "info",
}

interface Props {
  readonly children: React.ReactNode;
}

interface State {
  readonly show: boolean;
  readonly message: string;
  readonly variant: ToastVariant;
}

export class SharedSnackbarProvider extends React.Component<Props, State> {
  public readonly state = {
    show: false,
    message: '',
    variant: ToastVariant.INFO,
  }

  public readonly openSnackbar = (message: string, variant: ToastVariant) => {
    this.setState({
      message,
      variant,
      show: true,
    })
  }

  public readonly ocloseSnackbar = () => {
    this.setState({
      message: '',
      show: false,
    })
  }

  render() {
    const { children } = this.props

    return (
      <SharedSnackbarContext.Provider
        value={{
          openSnackbar: this.openSnackbar,
          closeSnackbar: this.closeSnackbar,
          snackbarIsOpen: this.state.isOpen,
          message: this.state.message,
          variant: this.state.variant,
        }}
      >
        <SharedSnackBar />
        {children}
      </SharedSnackbarContext.Provider>
    )
  }
}

export const SharedSnackbarConsumer = SharedSnackbarContext.Consumer