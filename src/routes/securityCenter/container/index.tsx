import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { PageStructure } from "~/components/templates/page";

import Layout from "../components";

class SecurityCenter extends React.Component<RouteComponentProps<{}>> {
  public readonly onBackupPhrase = (): void => {
    this.props.history.push("/backup-phrase/");
  };
  public readonly onSetPassword = (): void => {
    this.props.history.push("/set-password/");
  };
  render() {
    return (
      <PageStructure>
        <Layout onBackupPhrase={this.onBackupPhrase} onSetPassword={this.onSetPassword} />
      </PageStructure>
    );
  }
}

export default withRouter(SecurityCenter);
