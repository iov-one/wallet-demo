import * as Sentry from '@sentry/browser';
import * as React from "react";

interface State {
  readonly error: Error | null;
}

class ErrorBoundary extends React.Component<{}, State> {
  public readonly state = {
    error: null,
  };

  public readonly componentDidCatch = (error: Error | null, errorInfo: any): void => {
    this.setState({ error });
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });
      Sentry.captureException(error);
    });
  }

  public render(): JSX.Element {
    if (this.state.error) {
      //render fallback UI
      return (
        <a onClick={() => Sentry.showReportDialog()}>Report feedback</a>
      );
    } else {
      //when there's not an error, render children untouched
      return (
        <React.Fragment>
          {this.props.children}
        </React.Fragment>
      );
    }
  }
}

export default ErrorBoundary;
