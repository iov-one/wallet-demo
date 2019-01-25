import { ClickAwayListener } from "@material-ui/core";
import * as Sentry from "@sentry/browser";
import * as React from "react";
//import { SentryWidget } from "./SentryWidget";

interface Props {
  readonly type: "inner" | "outer";
}

interface State {
  //readonly error: Error | null;
  readonly openSentry: boolean;
}

const style = {};

export default class ErrorBoundary extends React.Component<Props, State> {
  public readonly state = {
    //error: null,
    openSentry: false,
  };

  public readonly componentDidCatch = (error: Error | null, errorInfo: any): void => {
    //this.setState({ error });
    this.setState({ openSentry: true });
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });
      Sentry.captureException(error);
    });
  };

  public readonly closeSentry = () => {
    this.setState({ openSentry: false });
  }

  public render(): React.ReactNode {
    return this.state.openSentry ? (
      <ClickAwayListener
        onClickAway={this.closeSentry}
      >
        {Sentry.showReportDialog() as React.ReactNode}
      </ClickAwayListener >
    ) : this.props.children;
  }
}
