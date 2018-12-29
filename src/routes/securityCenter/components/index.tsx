import * as React from "react";
import BPIcon from "../assets/backupPhrase.svg";
import { FormValues } from "../container/index";
import ExtraSecurity from "./ExtraSecurity";
import SecurityCard from "./ItemCard";
import PageTitle from "./PageTitle";
import SetPassword from "./SetPassword";

interface Props {
  readonly onSetPasswordSubmit: (values: FormValues) => void;
  readonly onBackupPhrase: () => void;
}

export default ({ onSetPasswordSubmit }: Props): JSX.Element => {
  return (
    <React.Fragment>
      <PageTitle />
      <SetPassword onSubmit={onSetPasswordSubmit} />
      <SecurityCard title="Set a backup phrase" action="Back up again" onClick={() => true} icon={BPIcon} />
      <ExtraSecurity />
    </React.Fragment>
  );
};
