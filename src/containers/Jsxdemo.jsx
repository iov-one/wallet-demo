import * as React from "react";
import { withRouter } from "react-router";

import { PageStructure } from "../components/compoundComponents/page";
import { LoginForm } from "../components/templates/forms";

class Demo extends React.Component {
  render() {
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

export const JsxDemo = withRouter(Demo);
