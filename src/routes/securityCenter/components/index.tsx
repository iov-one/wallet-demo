import React from "react";
import { SuggestionButton } from "~/components/subComponents/buttons";
import BPIcon from "../assets/backupPhrase.svg";
import PswIcon from "../assets/password.svg";
import AdvancedSecurity from "./AdvancedSecurity";
import SecurityCard from "./ItemCard";
import PageTitle from "./PageTitle";
import Block from "~/components/layout/Block";
import Typography from "~/components/layout/Typography";

interface Props {
  readonly showAdvancedSecurity: boolean;

  readonly onSetPassword: () => void;
  readonly onBackupPhrase: () => void;
  readonly onAdvancedSecurity: () => void;
  readonly closeAdvancedSecurity: () => void;
}

export default ({ onAdvancedSecurity, showAdvancedSecurity, closeAdvancedSecurity }: Props): JSX.Element => (
  <React.Fragment>
    <PageTitle />
    <SecurityCard title="Set a password" linkText="Change" link="/" icon={PswIcon} />
    <SecurityCard title="Set a backup phrase" linkText="Back up again" link="/" icon={BPIcon} />
    <AdvancedSecurity
      showAdvancedSecurity={showAdvancedSecurity}
      closeAdvancedSecurity={closeAdvancedSecurity}
    />
    <Block margin="xs">
      <Typography variant="subtitle1" color="textPrimary">Extra security?</Typography>
    </Block>
    <Block margin="lg">
      <Typography variant="subtitle1" color="primary" underlined onClick={onAdvancedSecurity}>See advanced security</Typography>
    </Block>
  </React.Fragment>
);
