import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";

import { ChainAccount, getMyAccounts } from "../selectors";

interface RequireLoginProps extends RouteComponentProps<{}> {
  readonly accounts: ReadonlyArray<ChainAccount>;
  readonly children?: React.ReactNode | ReadonlyArray<React.ReactNode>;
}

export class RequireLoginRaw extends React.Component<any, any> {
  public componentDidMount(): void {
    const { accounts } = this.props;
    console.log("mounted");
    console.log(accounts);
  }

  public render(): JSX.Element {
    const { children } = this.props;
    return <div>{children}</div>;
  }
}

// Note that this takes ownProps as an argument (for the router stuff), and must return a typed HomeProps
const mapStateToProps = (state: any, ownProps: RequireLoginProps): RequireLoginProps => ({
  ...ownProps,
  accounts: getMyAccounts(state),
});

// With the above info, we can now properly combine this all and withRouter will be happy
const connectedModule = connect(
  mapStateToProps,
  undefined,
)(RequireLoginRaw);

export const RequireLogin = withRouter(connectedModule);

export const RequireLoginPage = () => (
  <RequireLogin>
    <span>One</span>
    <span>Two</span>
    <span>Three</span>
  </RequireLogin>
);
