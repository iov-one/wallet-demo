import { History } from "history";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";

import { ChainAccount, getMyAccounts } from "../selectors";

interface RequireLoginProps extends RouteComponentProps<{}> {
  readonly accounts: ReadonlyArray<ChainAccount>;
  readonly children?: React.ReactNode | ReadonlyArray<React.ReactNode>;
}

function pushUnlessPath(history: History<any>, dest: string): void {
  if (history.location.pathname !== dest) {
    history.push(dest);
  }
}

//export class RequireLoginRaw extends React.Component<RequireLoginProps, any> {
export class RequireLoginRaw extends React.Component<any, any> {
  public componentDidMount(): void {
    const { accounts, history } = this.props;
    console.log("mounted");
    console.log(accounts);
    if (accounts.length === 0 || accounts[0].account === undefined) {
      pushUnlessPath(history, "/login"); // TODO: login screen
    } else if (accounts[0].account.name === undefined) {
      pushUnlessPath(history, "/invite"); // TODO: set name screen
    }
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
const connectedModule = connect(mapStateToProps)(RequireLoginRaw);

export const RequireLogin = withRouter(connectedModule);

export const RequireLoginPage = () => (
  <RequireLogin>
    <span>One</span>
    <span>Two</span>
    <span>Three</span>
  </RequireLogin>
);
