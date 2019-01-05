import * as React from "react";
import { FormType } from "~/components/forms/Form";
import OneColumn from "./OneColumn";
import PageTitle from "./PageTitle";
import PasswordForm from "./PasswordForm";

interface Props {
  readonly onPasswordValidation: (values: FormType) => object | Promise<object>;
  readonly onSetPasswordSubmit: (values: FormType) => Promise<void>;
}

export default ({ onSetPasswordSubmit, onPasswordValidation }: Props): JSX.Element => {
  return (
    <OneColumn>
      <PageTitle />
      <PasswordForm onSubmit={onSetPasswordSubmit} validation={onPasswordValidation} />
    </OneColumn>
  );
};
