import * as React from "react";
import { hasStoredProfile } from "~/logic";

class Home extends React.Component<{}, {}> {
  public async componentDidMount(): Promise<void> {
    const { hasIdentity, db } = this.props
    // this is the logged in
    if (hasIdentity) {
      history.push("/balance");
      
      return;
    }

    // otherwise, redirect to login or signup
    if (hasStoredProfile(db)) {
      history.push("/login");
    } else {
      history.push("/signup");
    }
  }

  render() {
    return <React.Fragment />;
  }
}

export default Home;
