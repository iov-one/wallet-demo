import * as React from "react"
import Layout from "~/routes/signup/components/Layout"

type Props = {};

type State = {
  readonly page: number;
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async (values: object) => {
  await sleep(300);
  console.log(values);
};

class SignUp extends React.Component<Props, State> {
  public readonly state = {
    page: 0,
  };

  public render(): JSX.Element {
    return (
      <Layout onSubmit={onSubmit} />
    )
  }
}

export default SignUp;
