import * as React from "react";
import { connect } from "react-redux";
import { hasStoredProfile } from "~/logic";
import { BALANCE_ROUTE, LOGIN_ROUTE, SIGNUP_ROUTE } from "~/routes";
import { history } from "~/store";
import selector, { SelectorProps } from "./selector";

class Home extends React.Component<SelectorProps, {}> {
  public async componentDidMount(): Promise<void> {
    const { hasIdentity, db } = this.props;

    if (hasIdentity) {
      history.push(BALANCE_ROUTE);

      return;
    }

    const hasProfile = await hasStoredProfile(db);
    if (hasProfile) {
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
