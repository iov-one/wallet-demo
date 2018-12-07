import * as React from "react";
import PageColumn from "~/components/pages/PageColumn";
import { CreateAccount, PeopleImg } from "../components/FirstStep";

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

    return page === 0 ? (
      <PageColumn leftMenu={PeopleImg}>
        <CreateAccount onSubmit={this.onCreateAccount} />
      </PageColumn>
    ) : (
      <PageColumn leftMenu={PeopleImg}>
        <CreateAccount onSubmit={this.onCreateAccount} />
      </PageColumn>
    );
  }
}

export default SignUp;
