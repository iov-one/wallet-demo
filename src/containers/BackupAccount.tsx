// tslint:disable:no-empty
// TODO: remove above comment when the empty onClick is gone
import * as React from "react";
import { withRouter } from "react-router";

import { PageStructure } from "../components/compoundComponents/page";
import { BackupAccountForm } from "../components/templates/forms";

class BackupAccount extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <PageStructure whiteBg>
        <BackupAccountForm onNext={() => {}} />
      </PageStructure>
    );
  }
}

export const BackupAccountPage = withRouter(BackupAccount);
