// tslint:disable:no-string-literal
import config from "config";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { SET_NAME_ROUTE } from "~/containers/routes";
import CreateAccount from "~/routes/signupPass/components";
import { FormAccount, PASSWORD_FIELD } from "~/routes/signupPass/components/FormComponent";
import { history } from "~/store";
import actions, { HomeActions } from "./actions";

interface Props extends HomeActions, RouteComponentProps<{}> {}

class SignupPass extends React.Component<Props> {
  public readonly onCreateAccount = async (values: object) => {
    const { boot, drinkFaucet } = this.props;
    const password = (values as FormAccount)[PASSWORD_FIELD];
    try {
      const { accounts } = await boot(password, [config["chainSpec"]]);
      const mainAccount = accounts[0];
      const account = mainAccount ? mainAccount.account : undefined;
      if (!account) {
        await drinkFaucet(config["defaultFaucetUri"], config["faucetToken"]);
      }
    } catch (err) {
      // TODO based on err show error
      console.log(err);
    }

    history.push(SET_NAME_ROUTE);
  };

  public render(): JSX.Element {
    return <CreateAccount onSubmit={this.onCreateAccount} />;
  }
}

export default connect(
  undefined,
  actions,
)(SignupPass);
