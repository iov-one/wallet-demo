import * as React from "react";
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
  readonly setPasswordSubmit: (values: FormValues) => void;

  readonly onBackupPhrase: () => void;
  readonly onAdvancedSecurity: () => void;
  readonly closeAdvancedSecurity: () => void;
}

export default ({
  onAdvancedSecurity,
  showAdvancedSecurity,
  closeAdvancedSecurity,
  setPasswordSubmit,

  onSetPassword,
  showSetPassword,
  closeSetPassword,
}: Props): JSX.Element => (
  <React.Fragment>
    <PageTitle />
    <SecurityCard title="Set a password" action="Change" onClick={onSetPassword} icon={PswIcon} />
    <SecurityCard title="Set a backup phrase" action="Back up again" onClick={()=>(true)} icon={BPIcon} />
    <AdvancedSecurity
      showAdvancedSecurity={showAdvancedSecurity}
      closeAdvancedSecurity={closeAdvancedSecurity}
    />
    <ExtraSecurity onClick={onAdvancedSecurity} />
    <SetPassword
      showSetPassword={showSetPassword}
      closeSetPassword={closeSetPassword}
      onSubmit={setPasswordSubmit}
    />
  </React.Fragment>
);
