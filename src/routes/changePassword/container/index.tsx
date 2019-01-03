import * as React from "react";
import { connect } from "react-redux";
import { Errors, FormType } from "~/components/forms/Form";
import { ToastVariant } from "~/components/layout/Toast";
import PageMenu from "~/components/pages/PageMenu";
import { loadProfile, resetProfile } from "~/logic/profile";
import Layout from "../components";
import { CONFIRM_PASSWORD, CURRENT_PASSWORD, NEW_PASSWORD } from "../components/PasswordForm";
import selectors, { SelectorProps } from "./selector";

interface State {
  readonly showToast: boolean;
  readonly toastVariant: ToastVariant;
  readonly toastMessage: string;
}

class ChangePassword extends React.Component<SelectorProps, State> {
  public readonly state = {
    showToast: false,
    toastVariant: ToastVariant.SUCCESS,
    toastMessage: "Password updated succefully"
  };  

  public readonly onSetPasswordSubmit = async (values: FormType): Promise<void> => {   
    const checkCurrentPass = await this.checkUserPassword(values[CURRENT_PASSWORD]);
    if (checkCurrentPass) {
      try {
        await resetProfile(this.props.db, values[NEW_PASSWORD]);
        this.showSuccessToast("Password updated succefully");
      } catch (err) {
        console.log(err);
      }
    } else {
      this.showErrorToast("Wrong current password");
    }
  };

  public readonly checkUserPassword = async (currentPassword: string | undefined): Promise<boolean> => {
    if (!currentPassword) {
      return false;
    }

    try {
      await loadProfile(this.props.db, currentPassword);
      return true;
    } catch (err) {
      return false;
    }
  };

  public readonly onPasswordValidation = (values: FormType): object => {
    let errors: Errors = {};
    if (values[CURRENT_PASSWORD] === values[NEW_PASSWORD]) {
      errors = { ...errors, [NEW_PASSWORD]: "New password should be different" };
    }
    if (values[NEW_PASSWORD] !== values[CONFIRM_PASSWORD]) {
      errors = { ...errors, [CONFIRM_PASSWORD]: "Passwords do not match" };
    }
    return errors;
  };

  public readonly toastOnClose = (): void => {
    this.setState({
      showToast: false
    });
  }

  public render(): JSX.Element {
    return (
      <PageMenu>
        <Layout
          onSetPasswordSubmit={this.onSetPasswordSubmit}
          onPasswordValidation={this.onPasswordValidation}
          showToast={this.state.showToast}
          toastOnClose={this.toastOnClose}
          toastVariant={this.state.toastVariant}
          toastMessage={this.state.toastMessage}
        />
      </PageMenu>
    );
  }

  private readonly showSuccessToast = (message: string): void => {
    this.setState({
      showToast: true,
      toastVariant: ToastVariant.SUCCESS,
      toastMessage: message
    });
  }

  private readonly showErrorToast = (message: string): void => {
    this.setState({
      showToast: true,
      toastVariant: ToastVariant.ERROR,
      toastMessage: message
    });
  }
}

export default connect(selectors)(ChangePassword);
