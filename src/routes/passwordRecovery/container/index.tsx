import * as React from "react";
import { toastHoc, ToastType } from "~/components/hoc/ToastHoc";
import { ToastVariant } from "~/components/layout/Toast";
import { createProfile } from "~/logic/profile";
import RecoverProfile from "../components/recoverProfile";
import UpdatePass from "../components/updatePass";

interface State {
  readonly currentStep: number;
}

class PasswordRecovery extends React.Component<ToastType, State> {
  public readonly state = {
    currentStep: 1,
  };

  public readonly createProfileFromMnemonic = async (mnemonic: string): Promise<void> => {
    console.log(mnemonic);
    try {
      await createProfile(mnemonic);
      this.setState({
        currentStep: 2
      });
    } catch {
      this.props.showToast("The backup phrase you entered is invalid", ToastVariant.ERROR);
    }
  }

  public render(): JSX.Element {
    return this.state.currentStep === 1 ? <RecoverProfile onSubmit={this.createProfileFromMnemonic} /> : <UpdatePass />;
  }
}

export default toastHoc(PasswordRecovery);
