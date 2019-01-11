import * as React from "react";
import { connect } from "react-redux";
import { FormType } from "~/components/forms/Form";
import { toastHoc, ToastType } from "~/components/hoc/ToastHoc";
import { ToastVariant } from "~/context/ToastProvider/Toast";
import Layout from "~/routes/login/components";
import { LOGIN_PASS_FIELD } from "~/routes/login/components/FormComponent";
import { loginAccount } from "~/sequences/login";
import actions, { HomeActions } from "./actions";

interface Props extends ToastType, HomeActions {}

class SignUp extends React.Component<Props, {}> {
  public readonly onLogin = async (values: object) => {
    const { boot, drinkFaucet } = this.props;
    const password = (values as FormType)[LOGIN_PASS_FIELD];

    try {
      await loginAccount(boot, drinkFaucet, password);
    } catch (err) {
      this.props.showToast("Wrong password, try again.", ToastVariant.ERROR);
    }
  };

  public render(): JSX.Element {
    return <Layout onSubmit={this.onLogin} />;
  }
}

export default connect(
  undefined,
  actions,
)(toastHoc(SignUp));
