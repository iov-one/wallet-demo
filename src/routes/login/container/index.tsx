import * as React from "react";
import { connect } from "react-redux";
import { Errors, FormType } from "~/components/forms/Form";
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

  public readonly validate = async (_: any) => {
    // TODO use Toast for showing error when login. Too invasive right now.
    const errors: Errors = {};
    /*
    const pass = (values as FormType)[LOGIN_PASS_FIELD];
    try {
      await this.props.boot(pass, [config["chainSpec"]]);
    } catch (err) {
      errors = { [LOGIN_PASS_FIELD]: "Wrong password, try again" };
    }
    */

    return errors;
  };

  public render(): JSX.Element {
    return <Layout onSubmit={this.onLogin} validate={this.validate} />;
  }
}

export default connect(
  undefined,
  actions,
)(SignUp);
