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

import ComingSoonIcon from "../assets/coming_soon.svg";

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

  public readonly onAdvancedSecurityClose = (): void => {
    this.setState({
      showAdvancedSecModal: false,
    });
  }

  // TODO refactor this removing pageStructure container and use the Grid once #172 is done
  public render(): JSX.Element {

    return (
      <PageStructure>
        <React.Fragment>
          <Layout
            onBackupPhrase={this.onBackupPhrase}
            onSetPassword={this.onSetPassword}
            onAdvancedSecurity={this.onAdvancedSecurity}
          />
          <AlertDialog 
            icon={ComingSoonIcon} 
            title="Coming soon..." 
            showDialog={this.state.showAdvancedSecModal}
            onClose={this.onAdvancedSecurityClose}>
            Extra security is something we’re working on, stay tooned!
          </AlertDialog>
        </React.Fragment>
      </PageStructure>
    );
  }
}

export default withRouter(SecurityCenter);
