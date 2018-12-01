import * as React from "react";
import Layout from "~/routes/signup/components/Layout";

interface State {
  readonly page: number;
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async (values: object) => {
  await sleep(300);
  console.log(values);
};

class SignUp extends React.Component<{}, State> {
  public readonly state = {
    page: 0,
  };

  public render(): JSX.Element {
    return <Layout onSubmit={onSubmit} />;
  }
}

export default SignUp;
