import { Ed25519HdWallet } from "@iov/keycontrol";
import * as React from "react";
import { connect } from "react-redux";
import { Errors, FormType } from "~/components/forms/Form";
import { toastHoc, ToastType } from "~/components/hoc/ToastHoc";
import { ToastVariant } from "~/context/ToastProvider/Toast";
import { loginAccount } from "~/sequences/login";
import RecoverProfile from "../components/recoverProfile";
import { UpdatePass } from "../components/updatePass";
import { CONFIRM_PASS_FIELD, LOGIN_PASS_FIELD } from "../components/UpdatePassForm";
import actions, { ActionsInterface } from "./actions";

interface Props extends ToastType, ActionsInterface {}

interface State {
  readonly currentStep: number;
  readonly mnemonic: string;
}

class PasswordRecovery extends React.Component<Props, State> {
  public readonly state = {
    currentStep: 1,
    mnemonic: "",
  };

  public readonly createProfileFromMnemonic = async (mnemonic: string): Promise<void> => {
    console.log(mnemonic);
    try {
      Ed25519HdWallet.fromMnemonic(mnemonic);
      this.setState({
        currentStep: 2,
        mnemonic: mnemonic,
      });
    } catch {
      this.props.showToast("The backup phrase you entered is invalid", ToastVariant.ERROR);
    }
  };

  public readonly passwordValidation = (values: FormType): object => {
    let errors: Errors = {};

    if (values[LOGIN_PASS_FIELD] !== values[CONFIRM_PASS_FIELD]) {
      errors = { ...errors, [CONFIRM_PASS_FIELD]: "Passwords do not match" };
    }
    return errors;
  };

  public readonly onPasswordSubmit = async (values: FormType): Promise<void> => {
    const { boot, drinkFaucet } = this.props;
    const password = values[LOGIN_PASS_FIELD];
    try {
      await loginAccount(boot, drinkFaucet, password, this.state.mnemonic);
    } catch (err) {
      this.props.showToast("Unable to restore profile.", ToastVariant.ERROR);
      console.log(err);
    }
  };

  public render(): JSX.Element {
    return this.state.currentStep === 1 ? (
      <RecoverProfile onSubmit={this.createProfileFromMnemonic} />
    ) : (
      <UpdatePass onSubmit={this.onPasswordSubmit} validation={this.passwordValidation} />
    );
  }
}

export default connect(
  undefined,
  actions,
)(toastHoc(PasswordRecovery));
