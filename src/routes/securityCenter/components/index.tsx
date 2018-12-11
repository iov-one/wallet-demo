import React from "react";

import { SecurityCard } from "./ItemCard";
import PageTitle from "./PageTitle";

import { SuggestionButton } from "~/components/subComponents/buttons";

interface Props {
  readonly onSetPassword: () => void;
  readonly onBackupPhrase: () => void;
  readonly onAdvancedSecurity: () => void;
}

export default ({ onSetPassword, onBackupPhrase, onAdvancedSecurity }: Props): JSX.Element => (
  <React.Fragment>
    <PageTitle />
    <SecurityCard title="Set a password" linkText="Change" onClickLink={onSetPassword} />
    <SecurityCard title="Set a backup phrase" linkText="Back up again" onClickLink={onBackupPhrase} />
    <SuggestionButton
      suggestionText="Extra security?"
      buttonText="See advanced security"
      onClick={onAdvancedSecurity}
    />
  </React.Fragment>
);
