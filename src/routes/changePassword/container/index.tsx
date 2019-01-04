import * as React from "react";
import { connect } from "react-redux";
import { Errors, FormType } from "~/components/forms/Form";
import { ToastVariant } from "~/components/layout/Toast";
import { ToastConsumer, ToastContextInterface } from "~/components/layout/ToastProvider";
import PageMenu from "~/components/pages/PageMenu";
import { loadProfile } from "~/logic/profile";
import Layout from "../components";
import { CONFIRM_PASSWORD, CURRENT_PASSWORD, NEW_PASSWORD } from "../components/PasswordForm";
import selectors, { SelectorProps } from "./selector";

interface Props extends SelectorProps {
  readonly showToast: (message: string, variant: ToastVariant) => void;
}

class ChangePassword extends React.Component<Props> {

  public readonly onSetPasswordSubmit = async (values: FormType): Promise<void> => {
    const checkCurrentPass = await this.checkUserPassword(values[CURRENT_PASSWORD]);

    if (!checkCurrentPass) {
      this.showErrorToast("Wrong current password");
      return;
    }

    const { profile, db } = this.props;
    if (!profile) {
      this.showErrorToast("Profile do not loaded correctly");
      return;
    }

    try {
      await profile.storeIn(db, values[NEW_PASSWORD]);
      this.showSuccessToast("Password updated succefully");
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

  public readonly toastOnClose = (): void => {
    this.setState({
      showToast: false,
    });
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

  private readonly showSuccessToast = (message: string): void => {
    this.props.showToast(message, ToastVariant.SUCCESS);
  };

  private readonly showErrorToast = (message: string): void => {
    this.props.showToast(message, ToastVariant.ERROR);
  };
}

const ChangePasswordWithToast = (props: SelectorProps): JSX.Element => (
  <ToastConsumer>
    {({ showToast }: ToastContextInterface) => (
      <ChangePassword showToast={showToast} {...props} />
    )}
  </ToastConsumer>
)

export default connect(selectors)(ChangePasswordWithToast);
