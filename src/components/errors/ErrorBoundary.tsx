import * as Sentry from "@sentry/browser";
import * as React from "react";

interface Props {
  readonly type: "inner" | "outer";
}

interface State {
  readonly openSentry: boolean;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  public readonly state = {
    openSentry: false,
  };

  public readonly componentDidCatch = (error: Error | null, errorInfo: any): void => {
    this.setState({ openSentry: true });
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });
      Sentry.captureException(error);
    });
  };

  public render(): React.ReactNode {
    return this.state.openSentry ? (
      <React.Fragment>{Sentry.showReportDialog() as React.ReactNode}</React.Fragment>
    ) : (
      this.props.children
    );
  }
}
