// tslint:disable:no-empty
// TODO: remove above comment when the empty onClick is gone
import * as React from "react";
import { withRouter } from "react-router";

import { PageStructure } from "../compoundComponents/page";
import { SetPasswordForm } from "../templates/forms";

class Password extends React.Component<any, any> {
  public render(): JSX.Element {
    const { history } = this.props;
    return (
      <PageStructure whiteBg>
        <SetPasswordForm
          onNext={() => {
            history.push("/balance/");
          }}
        />
      </PageStructure>
    );
  }
}

export const PasswordPage = withRouter(Password);
