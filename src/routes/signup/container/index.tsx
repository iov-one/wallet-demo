import config from "config";
import * as React from "react";
import { connect } from "react-redux";
import { CreateAccount } from "../components/FirstStep";
import { CreateUsername } from "../components/SecondStep";
import actions, { HomeActions } from "./actions";

interface State {
  readonly page: number;
}

class SignUp extends React.Component<HomeActions, State> {
  public readonly state = {
    page: 0,
  };

  public async componentDidMount(): Promise<void> {
    const { boot } = this.props;
    try {
      // tslint:disable-next-line:no-string-literal
      // const { accounts } = await boot(config["defaultPassword"], [config["chainSpec"]]);
      // tslint:disable-next-line:no-string-literal
      const { accounts } = await boot(config["defaultPassword"], [config["chainSpec"]]);
      console.log(accounts);
    } catch (err) {
      console.log("error during boot phase");
      console.log(err);
    }
  }

  public readonly onCreateAccount = async (values: object) => {
    this.setState({ page: 1 });
    console.log(values);
  };

  public readonly onBack = () => {
    this.setState(prevState => ({ page: prevState.page - 1 }));
  };

  public render(): JSX.Element {
    const { page } = this.state;

    if (page === 0) {
      return <CreateAccount onSubmit={this.onCreateAccount} />;
    }

    return <CreateUsername onSubmit={this.onCreateAccount} onBack={this.onBack} />;
  }
}

export default connect(
  undefined,
  actions,
)(SignUp);
 