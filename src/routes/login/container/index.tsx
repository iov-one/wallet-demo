import * as React from "react";
import { connect } from "react-redux";
import { FormType } from "~/components/forms/Form";
import { toastHoc, ToastType } from "~/components/hoc/ToastHoc";
import { ToastVariant } from "~/context/ToastProvider/Toast";
import { hasStoredProfile } from "~/logic";
import Layout from "~/routes/login/components";
import { LOGIN_PASS_FIELD } from "~/routes/login/components/FormComponent";
import { loginAccount } from "~/sequences/login";
import actions, { HomeActions } from "./actions";
import selectors, { SelectorProps } from "./selector";

interface Props extends ToastType, HomeActions, SelectorProps {}

class Login extends React.Component<Props, {}> {
  public readonly onLogin = async (values: object) => {
    const { boot, db } = this.props;
    const password = (values as FormType)[LOGIN_PASS_FIELD];

    const hasProfile = await hasStoredProfile(db);
    if (!hasProfile) {
      this.props.showToast(
        "Not found any stored profile. Perhaps you want to click on forgot your password instead?",
        ToastVariant.INFO,
      );
      return;
    }

    try {
      await loginAccount(boot, password);
    } catch (err) {
      this.props.showToast("Wrong password, try again.", ToastVariant.ERROR);
    }
  };

  public render(): JSX.Element {
    return <Layout onSubmit={this.onLogin} />;
  }
}

export default connect(
  selectors,
  actions,
)(toastHoc(Login));
