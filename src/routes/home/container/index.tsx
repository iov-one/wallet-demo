import * as React from "react";
import { connect } from "react-redux";
import { hasStoredProfile } from "~/logic";
import { BALANCE_ROUTE, LOGIN_ROUTE, SIGNUP_ROUTE } from "~/routes";
import { history } from "~/store";
import selector, { SelectorProps } from "./selector";

class Home extends React.Component<SelectorProps, {}> {
  public async componentDidMount(): Promise<void> {
    const { hasIdentity, accountName, db } = this.props;

    const hasIdentityWithName = hasIdentity && accountName;
    if (hasIdentityWithName) {
      history.push(BALANCE_ROUTE);

      return;
    }

    const hasProfile = await hasStoredProfile(db);
    const hasProfileWithName = hasProfile && accountName;
    if (hasProfileWithName) {
      history.push(LOGIN_ROUTE);

      return;
    }

    history.push(SIGNUP_ROUTE);
  }

  public render(): JSX.Element {
    return <React.Fragment />;
  }
}

export default connect(selector)(Home);
