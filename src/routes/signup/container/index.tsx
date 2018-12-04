import * as React from "react";
import Layout from "~/routes/signup/components/Layout";

interface State {
  readonly page: number;
}

class SignUp extends React.Component<{}, State> {
  public readonly state = {
    page: 0,
  };

  public readonly onSubmit = async (values: object) => {
    this.setState({ page: 1 });
    console.log(values);
  };

  public render(): JSX.Element {
    return <Layout onSubmit={this.onSubmit} />;
  }
}

export default SignUp;
