import * as React from "react";
import { connect } from "react-redux";
import { FormType } from "~/components/forms/Form";
import Layout from "~/routes/login/components";
import { LOGIN_PASS_FIELD } from "~/routes/login/components/FormComponent";
import { loginAccount } from "~/sequences/login";
import actions, { HomeActions } from "./actions";

class SignUp extends React.Component<HomeActions, {}> {
  public readonly onLogin = async (values: object) => {
    const { boot, drinkFaucet } = this.props;
    const password = (values as FormType)[LOGIN_PASS_FIELD];

    await loginAccount(boot, drinkFaucet, password);
  };

  public render(): JSX.Element {
    return <Layout onSubmit={this.onLogin} />;
  }
}

export default connect(
  undefined,
  actions,
)(SignUp);
