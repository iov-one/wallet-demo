// tslint:disable:no-empty
// TODO: remove above comment when the empty onClick is gone
import * as React from "react";
import { withRouter } from "react-router";

import { PageStructure } from "../components/compoundComponents/page";
import { LoginForm } from "../components/templates/forms";

class Login extends React.Component<any, any> {
  public render(): JSX.Element {
    const { history } = this.props;
    return (
      <PageStructure whiteBg>
        <LoginForm
          onNext={() => {
            history.push("/setPassword/");
          }}
        />
      </PageStructure>
    );
  }
}

export const LoginPage = withRouter(Login);
