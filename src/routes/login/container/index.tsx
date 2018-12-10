import * as React from "react";
import Layout from "~/routes/login/components";

class SignUp extends React.Component<{}, {}> {
  public readonly onLogin = async (values: object) => {
    console.log(values);
  };

  public render(): JSX.Element {
    return <Layout onSubmit={this.onLogin} />;
  }
}

export default SignUp;
