import React from "react";
import PageMenu from "~/components/pages/PageMenu";
import { BACKUP_PHRASE_ROUTE, SET_PASSWORD_ROUTE } from "~/routes";
import { history } from "~/store";
import Layout from "../components";

interface SecurityCenterState {
  readonly showAdvancedSecurity: boolean;
}

class SecurityCenter extends React.Component<{}, SecurityCenterState> {
  public readonly state = {
    showAdvancedSecurity: false,
  };

  public readonly onBackupPhrase = (): void => {
    history.push(BACKUP_PHRASE_ROUTE);
  };
  public readonly onSetPassword = (): void => {
    history.push(SET_PASSWORD_ROUTE);
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
      <PageMenu>
        <Layout
          onBackupPhrase={this.onBackupPhrase}
          onSetPassword={this.onSetPassword}
          onAdvancedSecurity={this.onAdvancedSecurity}
          showAdvancedSecurity={this.state.showAdvancedSecurity}
          closeAdvancedSecurity={this.closeAdvancedSecurity}
        />
      </PageMenu>
    );
  }
}

export default SecurityCenter;
