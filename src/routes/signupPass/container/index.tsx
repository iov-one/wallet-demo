import * as React from "react";
import { connect } from "react-redux";
import { FormType } from "~/components/forms/Form";
import { hasStoredProfile } from "~/logic";
import { BALANCE_ROUTE, LOGIN_ROUTE } from "~/routes";
import CreateAccount from "~/routes/signupPass/components";
import { PASSWORD_FIELD } from "~/routes/signupPass/components/FormComponent";
import { loginAccount } from "~/sequences/login";
import { history } from "~/store";
import actions, { HomeActions } from "./actions";
import selectors, { SelectorProps } from "./selector";

interface Props extends HomeActions, SelectorProps {}

class SignupPass extends React.Component<Props> {
  public async componentDidMount(): Promise<void> {
    const { hasIdentity, db } = this.props;

    if (hasIdentity) {
      return history.push(BALANCE_ROUTE);
    }

    // TODO if reported errors remove db (DB_PROFILE_NAME) and redirect to HOME_ROUTE
    const hasProfile = await hasStoredProfile(db);
    if (hasProfile) {
      return history.push(LOGIN_ROUTE);
    }
  }

  public readonly onCreateAccount = async (values: object) => {
    const { boot, drinkFaucet } = this.props;
    const password = (values as FormType)[PASSWORD_FIELD];

    return loginAccount(boot, drinkFaucet, password);
  };

  public render(): JSX.Element {
    return <CreateAccount onSubmit={this.onCreateAccount} />;
  }
}

export default connect(
  selectors,
  actions,
)(SignupPass);
