import * as React from "react";
import { FormType } from "~/components/forms/Form";
import BPIcon from "../assets/backupPhrase.svg";
import ExtraSecurity from "./ExtraSecurity";
import SecurityCard from "./ItemCard";
import PageTitle from "./PageTitle";
import SetPassword from "./SetPassword";

interface Props {
  readonly onPasswordValidation: (values: FormType) => object | Promise<object>;
  readonly onSetPasswordSubmit: (values: FormType) => Promise<boolean>;
  readonly onBackupPhrase: () => void;
}

export default ({ onSetPasswordSubmit, onPasswordValidation }: Props): JSX.Element => {
  return (
    <React.Fragment>
      <PageTitle />
      <SetPassword onSubmit={onSetPasswordSubmit} validation={onPasswordValidation} />
      <SecurityCard title="Set a backup phrase" action="Back up again" onClick={() => true} icon={BPIcon} />
      <ExtraSecurity />
    </React.Fragment>
  );
};
