import * as React from "react";
import Block from "~/components/layout/Block";
import BPIcon from "../assets/backupPhrase.svg";
import PswIcon from "../assets/password.svg";
import AdvancedSecurity from "./AdvancedSecurity";
import { ExtraSecurity } from "./ExtraSecurity";
import SecurityCard from "./ItemCard";
import PageTitle from "./PageTitle";

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
    <SecurityCard title="Set a password" action="Change" icon={PswIcon} />
    <SecurityCard title="Set a backup phrase" action="Back up again" icon={BPIcon} />
    <Block margin="md" />
    <AdvancedSecurity
      showAdvancedSecurity={showAdvancedSecurity}
      closeAdvancedSecurity={closeAdvancedSecurity}
    />
    <ExtraSecurity onClick={onAdvancedSecurity} />
  </React.Fragment>
);
