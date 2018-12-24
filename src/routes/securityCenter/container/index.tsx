import React from "react";
import { PageStructure } from "~/components/templates/page";
import { BACKUP_PHRASE_ROUTE, SET_PASSWORD_ROUTE } from "~/routes";
import { history } from "~/store";
import Layout from "../components";

interface SecurityCenterState {
  readonly showAdvancedSecurity: boolean;
  readonly showSetPassword: boolean;
}

class SecurityCenter extends React.Component<{}, SecurityCenterState> {
  public readonly state = {
    showAdvancedSecurity: false,
    showSetPassword: false,
  };

  public readonly onBackupPhrase = (): void => {
    history.push(BACKUP_PHRASE_ROUTE);
  };

  public readonly onSetPassword = (): void => {
    this.setState({
      showSetPassword: true,
    });
  };
  public readonly closeSetPassword = (): void => {
    this.setState({
      showSetPassword: false,
    });
  };

  public readonly onAdvancedSecurity = (): void => {
    this.setState({
      showAdvancedSecurity: true,
    });
  };
  public readonly closeAdvancedSecurity = (): void => {
    this.setState({
      showAdvancedSecurity: false,
    });
  };

  

  // TODO refactor this removing pageStructure container and use the Grid once #172 is done
  public render(): JSX.Element {
    return (
      <PageStructure>
          <Layout
            onBackupPhrase={this.onBackupPhrase}
            onSetPassword={this.onSetPassword}
            showSetPassword={this.state.showSetPassword}
            closeSetPassword={this.closeSetPassword}

            onAdvancedSecurity={this.onAdvancedSecurity}
            showAdvancedSecurity={this.state.showAdvancedSecurity}
            closeAdvancedSecurity={this.closeAdvancedSecurity}
          />
      </PageStructure>
    );
  }
}

export default SecurityCenter;
