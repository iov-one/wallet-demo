import * as React from "react";
import { connect } from "react-redux";
import { FormType } from "~/components/forms/Form";
import { hasStoredProfile } from "~/logic";
import { LOGIN_ROUTE } from "~/routes";
import CreateAccount from "~/routes/signupPass/components";
import { PASSWORD_FIELD } from "~/routes/signupPass/components/FormComponent";
import { loginAccount } from "~/sequences/login";
import { history } from "~/store";
import actions, { HomeActions } from "./actions";
import selectors, { SelectorProps } from "./selector";

interface Props extends HomeActions, SelectorProps {}

class SignupPass extends React.Component<Props> {
  public async componentDidMount(): Promise<void> {
    const { db } = this.props;

    const hasProfile = await hasStoredProfile(db);
    if (hasProfile) {
      history.push(LOGIN_ROUTE);

      return;
    }
  }

  public readonly onCreateAccount = async (values: object) => {
    const { boot } = this.props;
    const password = (values as FormType)[PASSWORD_FIELD];

    await loginAccount(boot, password);
  };

  public render(): JSX.Element {
    return <CreateAccount onSubmit={this.onCreateAccount} />;
  }
}

export default connect(
  selectors,
  actions,
)(SignupPass);
