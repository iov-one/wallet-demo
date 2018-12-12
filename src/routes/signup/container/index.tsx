import config from "config";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { CreateAccount } from "../components/FirstStep";
import { FormAccount, PASSWORD_FIELD } from "../components/FirstStep/FormComponent";
import { CreateUsername } from "../components/SecondStep";
import actions, { HomeActions } from "./actions";

interface State {
  readonly page: number;
}
interface Props extends HomeActions, RouteComponentProps<{}> {}

class SignUp extends React.Component<Props, State> {
  public readonly state = {
    page: 0,
  };

  public async componentDidMount(): Promise<void> {
    // I suggest to creat account logic into singleton class and load the route directly
    // when loading the app. Basically is just move this method to the app's entrypoint.
    // If we do that we just need to create signup part 2 as a separate view (Which makes kind of sense)

    const hasNamedAccount = false; // how can we get that info? using the bootSequence?
    if (hasNamedAccount) {
      this.props.history.push("/balance/");
    }

    const hasAccount = false; // how can we get that info? using the bootSequence?
    // I would like to get the account if user refresh the page after creating one
    if (hasAccount) {
      this.setState({ page: 1 });
    }
  }

  public readonly onCreateAccount = async (values: object) => {
    const { boot, drinkFaucet, reset } = this.props;
    const password = (values as FormAccount)[PASSWORD_FIELD];
    try {
      // tslint:disable-next-line:no-string-literal
      const { accounts } = await boot(password, [config["chainSpec"]]);
      const mainAccount = accounts[0];
      const account = mainAccount ? mainAccount.account : undefined;
      if (!account) {
        // tslint:disable-next-line:no-string-literal
        await drinkFaucet(config["defaultFaucetUri"], config["faucetToken"]);
      }

      this.setState({ page: 1 });
      // I assume if we are here that means there is no account.name, otherwise we would not be here
    } catch (err) {
      await reset(password);
      // TODO reset form?
      console.log(err);
    }

    this.setState({ page: 1 });
    console.log(values);
  };

  public readonly onCreateUsername = async (values: object) => {
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

    return <CreateUsername onSubmit={this.onCreateUsername} onBack={this.onBack} />;
  }
}

const SignupContainer = connect<{}, {}, RouteComponentProps<{}>>(
  undefined,
  actions,
)(SignUp);

export default withRouter(SignupContainer);
