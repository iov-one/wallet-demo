import React from "react";
import RecoverProfile from "../components/recoverProfile";
import UpdatePass from "../components/updatePass";

interface State {
  readonly currentStep: number;
}

class PasswordRecovery extends React.Component<{}, State> {
  public readonly state = {
    currentStep: 2,
  };

  public render(): JSX.Element {
    return this.state.currentStep === 1 ? <RecoverProfile /> : <UpdatePass />;
  }
}

export default PasswordRecovery;
