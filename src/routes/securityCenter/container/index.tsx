import React from "react";
import PageMenu from "~/components/pages/PageMenu";
import { BACKUP_PHRASE_ROUTE } from "~/routes";
import { history } from "~/store";
import Layout from "../components";

export interface FormValues {
  readonly currentPassword?: string;
  readonly newPassword?: string;
  readonly confirmPassword?: string;
}
class SecurityCenter extends React.Component {
  public readonly onBackupPhrase = (): void => {
    history.push(BACKUP_PHRASE_ROUTE);
  };

  public readonly onSetPasswordSubmit = (values: FormValues): void => {
    console.log(values);
  };

  public render(): JSX.Element {
    return (
      <PageMenu>
        <Layout onBackupPhrase={this.onBackupPhrase} onSetPasswordSubmit={this.onSetPasswordSubmit} />
      </PageMenu>
    );
  }
}

export default SecurityCenter;
