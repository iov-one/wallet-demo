import React from "react";
import PageMenu from "~/components/pages/PageMenu";
import { BACKUP_PHRASE_ROUTE } from "~/routes";
import { history } from "~/store";
import Layout from "../components";

interface SecurityCenterState {
  readonly showAdvancedSecurity: boolean;
  readonly showSetPassword: boolean;
}
export interface FormValues {
  readonly currentPassword?: string;
  readonly newPassword?: string;
  readonly confirmPassword?: string;
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
  public readonly onSetPasswordSubmit = (values: FormValues): void => {
    console.log(values);
    this.closeSetPassword();
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

  public render(): JSX.Element {
    return (
      <PageMenu>
        <Layout
          onBackupPhrase={this.onBackupPhrase}
          onSetPassword={this.onSetPassword}
          showSetPassword={this.state.showSetPassword}
          closeSetPassword={this.closeSetPassword}
          onSetPasswordSubmit={this.onSetPasswordSubmit}
          onAdvancedSecurity={this.onAdvancedSecurity}
          showAdvancedSecurity={this.state.showAdvancedSecurity}
          closeAdvancedSecurity={this.closeAdvancedSecurity}
        />
      </PageMenu>
    );
  }
}

export default SecurityCenter;
