import * as React from "react";
import { connect } from "react-redux";
import { Redirect, RouteProps } from "react-router-dom";
import { HOME_ROUTE } from "~/routes";

import { ChainAccount, getMyAccounts } from "../selectors";

interface RequireLoginProps extends RouteProps {
  readonly accounts: ReadonlyArray<ChainAccount>;
  readonly children?: React.ReactNode | ReadonlyArray<React.ReactNode>;
}

class RequireLogin extends React.PureComponent<RequireLoginProps, {}> {
  public render(): JSX.Element {
    const { accounts, children, location } = this.props;
    if (location && location.pathname === HOME_ROUTE) {
      return <React.Fragment>{children}</React.Fragment>;
    }

    // redirect is the url to redirect to, or undefined if no redirect
    const redirect =
      accounts.length === 0 || accounts[0].account === undefined
        ? "/" /*login/signup page*/
        : accounts[0].account.name === undefined
        ? "/" /*set name page*/
        : undefined;
    // one redirect if needed, or all children
    return <React.Fragment>{redirect ? <Redirect push to={redirect} /> : children}</React.Fragment>;
  }
}

const mapStateToProps = (state: any, ownProps: RouteProps): RequireLoginProps => ({
  ...ownProps,
  accounts: getMyAccounts(state),
});

export default connect(
  mapStateToProps,
  undefined,
)(RequireLogin);
