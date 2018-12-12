import React from "react";

import { SecurityCard } from "./ItemCard";
import PageTitle from "./PageTitle";

import { SuggestionButton } from "~/components/subComponents/buttons";

import BPIcon from "../assets/backupPhrase.svg";
import PswIcon from "../assets/password.svg";

interface Props {
  readonly onSetPassword: () => void;
  readonly onBackupPhrase: () => void;
  readonly onAdvancedSecurity: () => void;
}

export default ({ onAdvancedSecurity }: Props): JSX.Element => (
  <React.Fragment>
    <PageTitle />
    <SecurityCard title="Set a password" linkText="Change" link="/" icon={PswIcon} />
    <SecurityCard title="Set a backup phrase" linkText="Back up again" link="/" icon={BPIcon} />
    <SuggestionButton
      suggestionText="Extra security?"
      buttonText="See advanced security"
      onClick={onAdvancedSecurity}
    />
  </React.Fragment>
);
