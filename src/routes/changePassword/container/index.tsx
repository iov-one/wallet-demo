import * as React from "react";
import { connect } from "react-redux";
import { Errors, FormType } from "~/components/forms/Form";
import { toastHoc, ToastType } from "~/components/hoc/ToastHoc";
import PageMenu from "~/components/pages/PageMenu";
import { ToastVariant } from "~/context/ToastProvider/Toast";
import { loadProfile } from "~/logic/profile";
import Layout from "../components";
import { CONFIRM_PASSWORD, CURRENT_PASSWORD, NEW_PASSWORD } from "../components/PasswordForm";
import selectors, { SelectorProps } from "./selector";

interface Props extends SelectorProps, ToastType {}

class ChangePassword extends React.Component<Props> {
  public readonly onSetPasswordSubmit = async (values: FormType): Promise<void> => {
    const checkCurrentPass = await this.checkUserPassword(values[CURRENT_PASSWORD]);

    if (!checkCurrentPass) {
      this.props.showToast("Wrong current password", ToastVariant.ERROR);
      return;
    }

    const { profile, db } = this.props;
    if (!profile) {
      this.props.showToast("Profile do not loaded correctly", ToastVariant.ERROR);
      return;
    }

    try {
      await profile.storeIn(db, values[NEW_PASSWORD]);
      this.props.showToast("Password updated succefully", ToastVariant.SUCCESS);
    } catch (err) {
      console.log(err);
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

  public render(): JSX.Element {
    return (
      <PageMenu phoneFullWidth>
        <Layout
          onSetPasswordSubmit={this.onSetPasswordSubmit}
          onPasswordValidation={this.onPasswordValidation}
        />
      </PageMenu>
    );
  }
}

export default toastHoc(connect(selectors)(ChangePassword));
