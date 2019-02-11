import * as React from "react";
import { connect } from "react-redux";
import { Redirect, RouteProps } from "react-router-dom";
import { AccountInfo } from "~/reducers/blockchain";
import { SET_NAME_ROUTE, SIGNUP_ROUTE } from "~/routes";
import { getBnsAccount } from "~/selectors";

interface RequireLoginProps extends RouteProps {
  readonly bnsAccount: AccountInfo | undefined;
  readonly children?: React.ReactNode | ReadonlyArray<React.ReactNode>;
}

class RequireLogin extends React.PureComponent<RequireLoginProps, {}> {
  public render(): JSX.Element {
    const { bnsAccount, children, location } = this.props;
    const path = location ? location.pathname : "N/A";

    const redirectPath =
      !bnsAccount || !bnsAccount.account
        ? SIGNUP_ROUTE /*login/signup page*/
        : bnsAccount.username === undefined
        ? SET_NAME_ROUTE /*set name page*/
        : undefined;

    const differentDestination = path !== redirectPath;
    const redirect = redirectPath && differentDestination;

    return <React.Fragment>{redirect ? <Redirect push to={redirectPath!} /> : children}</React.Fragment>;
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
