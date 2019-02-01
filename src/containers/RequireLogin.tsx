import * as React from "react";
import { connect } from "react-redux";
import { Redirect, RouteProps } from "react-router-dom";

import { AccountInfo } from "~/reducers/blockchain";
import { HOME_ROUTE, SET_NAME_ROUTE, SIGNUP_ROUTE } from "~/routes";
import { getBnsAccount } from "~/selectors";

interface RequireLoginProps extends RouteProps {
  readonly bnsAccount: AccountInfo | undefined;
  readonly children?: React.ReactNode | ReadonlyArray<React.ReactNode>;
}

class RequireLogin extends React.PureComponent<RequireLoginProps, {}> {
  public render(): JSX.Element {
    const { bnsAccount, children, location } = this.props;
    const path = location ? location.pathname : "N/A";
    if (path === HOME_ROUTE) {
      return <React.Fragment>{children}</React.Fragment>;
    }

    // redirect is the url to redirect to, or undefined if no redirect
    const redirect =
      !bnsAccount || !bnsAccount.account
        ? SIGNUP_ROUTE /*login/signup page*/
        : bnsAccount.username === undefined
        ? SET_NAME_ROUTE /*set name page*/
        : undefined;

    // one redirect if needed, or all children
    return (
      <React.Fragment>
        {redirect && redirect !== path ? <Redirect push to={redirect} /> : children}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: any, ownProps: RouteProps): RequireLoginProps => ({
  ...ownProps,
  bnsAccount: getBnsAccount(state),
});

export default connect(
  mapStateToProps,
  undefined,
)(RequireLogin);
