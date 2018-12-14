// tslint:disable:no-string-literal
import config from "config";
import * as React from "react";
import { connect } from "react-redux";
import { FormType } from "~/components/forms/Form";
import { hasStoredProfile } from "~/logic";
import { BALANCE_ROUTE, LOGIN_ROUTE, SET_NAME_ROUTE } from "~/routes";
import CreateAccount from "~/routes/signupPass/components";
import { PASSWORD_FIELD } from "~/routes/signupPass/components/FormComponent";
import { history } from "~/store";
import actions, { HomeActions } from "./actions";
import selectors, { SelectorProps } from "./selector";
 
interface Props extends HomeActions, SelectorProps {}

class SignupPass extends React.Component<Props> {
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
  }

  public readonly onCreateAccount = async (values: object) => {
    const { boot, drinkFaucet } = this.props;
    const password = (values as FormType)[PASSWORD_FIELD];
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
  selectors,
  actions,
)(SignupPass);
