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
  const path = history.location.pathname;
  console.log(`Got ${path}, want ${dest}`);
  if (path !== dest) {
    history.push(dest);
  }
}

//export class RequireLoginRaw extends React.Component<RequireLoginProps, any> {
export class RequireLoginRaw extends React.Component<any, any> {
  public componentDidMount(): void {
    console.log("mounted");
    this.redirectAnonymous();
  }

  public componentDidUpdate(): void {
    console.log("updated");
    this.redirectAnonymous();
  }

  public render(): JSX.Element {
    const { children } = this.props;
    return <div>{children}</div>;
  }

  private redirectAnonymous(): void {
    const { accounts, history } = this.props;
    console.log(accounts);
    if (accounts.length === 0 || accounts[0].account === undefined) {
      pushUnlessPath(history, "/"); // TODO: login screen
    } else if (accounts[0].account.name === undefined) {
      pushUnlessPath(history, "/"); // TODO: set name screen
    }
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
