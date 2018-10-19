// tslint:disable:no-empty
// TODO: remove above comment when the empty onClick is gone
import * as React from "react";
import { withRouter } from "react-router";

import { PageStructure } from "../components/compoundComponents/page";
import { CreateWalletForm } from "../components/templates/forms";

class Home extends React.Component<any, any> {
  public render(): JSX.Element {
    const { history } = this.props;
    return (
      <PageStructure whiteBg>
        <CreateWalletForm
          onNext={() => {
            history.push("/setPassword/");
          }}
        />
      </PageStructure>
    );
  }
}

export const HomePage = withRouter(Home);
