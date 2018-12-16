import * as React from "react";
import { Info, logComponentStack } from "~/utils/logBoundaries";

interface Props {
  readonly action: () => void;
}

class ErrorBoundary extends React.Component<Props> {
  public componentDidCatch(error: Error, info: Info): void {
    logComponentStack(error, info);
    this.props.action();
  }

  public render(): JSX.Element {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}

export default ErrorBoundary;
