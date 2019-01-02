import * as React from "react";
import { connect } from "react-redux";
import { Errors, FormType } from "~/components/forms/Form";
import PageMenu from "~/components/pages/PageMenu";
import { loadProfile, resetProfile } from "~/logic/profile";
import Layout from "../components";
import { CONFIRM_PASSWORD, CURRENT_PASSWORD, NEW_PASSWORD } from "../components/PasswordForm";
import selectors, { SelectorProps } from "./selector";

class ChangePassword extends React.Component<SelectorProps> {
  public readonly shouldComponentUpdate = (): boolean => {
    return false;
  };

  public readonly onSetPasswordSubmit = async (values: FormType): Promise<boolean> => {
    try {
      await resetProfile(this.props.db, values[NEW_PASSWORD]);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  public readonly checkUserPassword = async (
    currentPassword: string | undefined,
    errors: Errors,
  ): Promise<object> => {
    console.log(currentPassword);
    try {
      await loadProfile(this.props.db, currentPassword || "");
      return errors;
    } catch (err) {
      return { ...errors, [CURRENT_PASSWORD]: "Wrong current password" };
    }
  };

  public readonly onPasswordValidation = (values: FormType): Promise<object> => {
    let errors: Errors = {};
    if (values[CURRENT_PASSWORD] === values[NEW_PASSWORD]) {
      errors = { ...errors, [NEW_PASSWORD]: "New password should be different" };
      //errors[NEW_PASSWORD] = "New password should be different";
    }
    if (values[NEW_PASSWORD] !== values[CONFIRM_PASSWORD]) {
      errors = { ...errors, [CONFIRM_PASSWORD]: "Passwords do not match" };
      //errors[CONFIRM_PASSWORD] = "The passwords do not match";
    }
    return this.checkUserPassword(values[CURRENT_PASSWORD], errors);
  };

  public render(): JSX.Element {
    return (
      <PageMenu>
        <Layout
          onSetPasswordSubmit={this.onSetPasswordSubmit}
          onPasswordValidation={this.onPasswordValidation}
        />
      </PageMenu>
    );
  }
}

export default connect(selectors)(ChangePassword);
