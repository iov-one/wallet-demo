import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { PageStructure } from "~/components/templates/page";
import {
  SET_PASSWORD_ROUTE,
  BACKUP_PHRASE_ROUTE,
} from "~/containers/routes/index";

import Layout from "../components";
import { IOVModal } from "~/components/templates/modal";
import Block from "~/components/layout/Block";
import AlertDialog from "~/components/layout/AlertDialog";

interface SecurityCenterState {
  readonly showAdvancedSecModal: boolean;
}

class SecurityCenter extends React.Component<RouteComponentProps<{}>, SecurityCenterState> {
  public readonly state = {
    showAdvancedSecModal: false
  };

  public readonly onBackupPhrase = (): void => {
    this.props.history.push(BACKUP_PHRASE_ROUTE);
  };
  public readonly onSetPassword = (): void => {
    this.props.history.push(SET_PASSWORD_ROUTE);
  };
  public readonly onAdvancedSecurity = (): void => {
    this.setState({
      showAdvancedSecModal: true,
    });
  };

  // TODO refactor this removing pageStructure container and use the Grid once #172 is done
  public render(): JSX.Element {

    const { showAdvancedSecModal, } = this.state;
    return (
      <PageStructure>
        <React.Fragment>
          <Layout
            onBackupPhrase={this.onBackupPhrase}
            onSetPassword={this.onSetPassword}
            onAdvancedSecurity={this.onAdvancedSecurity}
          />
          <AlertDialog />
        </React.Fragment>
      </PageStructure>
    );
  }
}

export default withRouter(SecurityCenter);
