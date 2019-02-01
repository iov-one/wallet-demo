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
    const { hasIdentity, accountName, db } = this.props;

    const hasIdentityWithName = hasIdentity && accountName;
    if (hasIdentityWithName) {
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
    const { boot } = this.props;
    const password = (values as FormType)[PASSWORD_FIELD];

    return loginAccount(boot, password);
  };

  public render(): JSX.Element {
    return <CreateAccount onSubmit={this.onCreateAccount} />;
  }
}

export default connect(
  selectors,
  actions,
)(SignupPass);
