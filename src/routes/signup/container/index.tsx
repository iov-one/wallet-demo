import * as React from "react";
import { CreateAccount } from "../components/FirstStep";
import { CreateUsername } from "../components/SecondStep";

interface State {
  readonly page: number;
}

class SignUp extends React.Component<{}, State> {
  public readonly state = {
    page: 1,
  };

  public readonly onCreateAccount = async (values: object) => {
    this.setState({ page: 1 });
    console.log(values);
  };

  public readonly onBack = () => {
    this.setState((prevState) => ({ page: prevState.page - 1 }));
  };

  public render(): JSX.Element {
    const { page } = this.state;

    if (page === 0) {
      return <CreateAccount onSubmit={this.onCreateAccount} />;
    }

    return <CreateUsername onSubmit={this.onCreateAccount} onBack={this.onBack} />;
  }
}

export default SignUp;
