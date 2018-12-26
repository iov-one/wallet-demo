import React from "react";
import BPIcon from "../assets/backupPhrase.svg";
import PswIcon from "../assets/password.svg";
import { FormValues } from "../container/index";
import AdvancedSecurity from "./AdvancedSecurity";
import { ExtraSecurity } from "./ExtraSecurity";
import SecurityCard from "./ItemCard";
import PageTitle from "./PageTitle";
import SetPassword from "./SetPassword";

interface Props {
  readonly showAdvancedSecurity: boolean;
  readonly showSetPassword: boolean;

  readonly onSetPassword: () => void;
  readonly closeSetPassword: () => void;
  readonly onSetPasswordSubmit: () => void;

  readonly onBackupPhrase: () => void;
  readonly onAdvancedSecurity: () => void;
  readonly closeAdvancedSecurity: () => void;
}

export default ({
  onAdvancedSecurity,
  showAdvancedSecurity,
  closeAdvancedSecurity,
  onSetPasswordSubmit,

  onSetPassword,
  showSetPassword,
  closeSetPassword,
}: Props): JSX.Element => (
  <React.Fragment>
    <PageTitle />
    <SecurityCard title="Set a password" linkText="Change" onClick={onSetPassword} icon={PswIcon} />
    <SecurityCard title="Set a backup phrase" linkText="Back up again" onClick={() => true} icon={BPIcon} />
    <AdvancedSecurity
      showAdvancedSecurity={showAdvancedSecurity}
      closeAdvancedSecurity={closeAdvancedSecurity}
    />
    <ExtraSecurity onClick={onAdvancedSecurity} />
    <SetPassword
      showSetPassword={showSetPassword}
      closeSetPassword={closeSetPassword}
      onSubmit={onSetPasswordSubmit}
    />
  </React.Fragment>
);
