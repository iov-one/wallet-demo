import React from "react";

import { SecurityCard } from "./ItemCard";

interface Props {
  readonly onSetPassword: () => void;
  readonly onBackupPhrase: () => void;
}

export default ({ onSetPassword, onBackupPhrase }: Props): JSX.Element => (
  <React.Fragment>
    <SecurityCard title="Set a password" linkText="Change" onClickLink={onSetPassword} />
    <SecurityCard title="Set a backup phrase" linkText="Back up again" onClickLink={onBackupPhrase} />
  </React.Fragment>
);
