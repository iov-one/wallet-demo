import React from "react";
import { Message } from "~/components/layout/dialogs";

interface Props {
  readonly show: boolean;
  readonly onClose: () => void;
  readonly onSubmit: () => void;
}

export default ({ show, onClose, onSubmit }: Props): JSX.Element => (
  <Message
    title="Recover your account"
    showDialog={show}
    onClose={onClose}
    onSubmit={onSubmit}
    buttonName="Continue"
  >
    To recover the password, you must enter the twelve backup words in the correct order that you have written
    down. Note if you have lost or forgotten your twelve backup words you will be unable to recover your
    account.
  </Message>
);
