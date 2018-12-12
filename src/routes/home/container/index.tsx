import * as React from "react";
import { connect } from "react-redux";
import { hasStoredProfile } from "~/logic";
import { history } from "~/store";
import selector, { SelectorProps } from "./selector";

class Home extends React.Component<SelectorProps, {}> {
  public async componentDidMount(): Promise<void> {
    const { hasIdentity, db } = this.props;

    if (hasIdentity) {
      history.push("/balance");

      return;
    }

    if (hasStoredProfile(db)) {
      history.push("/login");

      return;
    }

    history.push("/signup");
  }

  public render(): JSX.Element {
    return <React.Fragment />;
  }
}

export default connect(selector)(Home);
