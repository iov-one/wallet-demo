import * as React from "react";
import { CreateAccount } from "../components/FirstStep";

interface State {
  readonly page: number;
}

class SignUp extends React.Component<{}, State> {
  public readonly state = {
    page: 0,
  };

  public readonly onCreateAccount = async (values: object) => {
    this.setState({ page: 1 });
    console.log(values);
  };

  public render(): JSX.Element {
    const { page } = this.state;

    if (page === 0) {
      return <CreateAccount onSubmit={this.onCreateAccount} />
    }
    
    return <CreateAccount onSubmit={this.onCreateAccount} />
  }
}

export default SignUp;
