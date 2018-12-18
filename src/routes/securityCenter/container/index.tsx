import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { PageStructure } from "~/components/templates/page";
import { 
  SET_PASSWORD_ROUTE, 
  BACKUP_PHRASE_ROUTE, 
  ADVANCED_SECURITY_ROUTE
} from "~/containers/routes/index";

import Layout from "../components";

class SecurityCenter extends React.Component<RouteComponentProps<{}>> {
  public readonly onBackupPhrase = (): void => {
    this.props.history.push(BACKUP_PHRASE_ROUTE);
  };
  public readonly onSetPassword = (): void => {
    this.props.history.push(SET_PASSWORD_ROUTE);
  };
  public readonly onAdvancedSecurity = (): void => {
    this.props.history.push(ADVANCED_SECURITY_ROUTE);
  };

  // TODO refactor this removing pageStructure container and use the Grid once #172 is done
  public render(): JSX.Element {
    return (
      <PageStructure>
        <Layout
          onBackupPhrase={this.onBackupPhrase}
          onSetPassword={this.onSetPassword}
          onAdvancedSecurity={this.onAdvancedSecurity}
        />
      </PageStructure>
    );
  }
}

export default withRouter(SecurityCenter);
