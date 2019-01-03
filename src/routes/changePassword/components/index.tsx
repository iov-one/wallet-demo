import * as React from "react";
import { FormType } from "~/components/forms/Form";
import { Toast, ToastVariant } from "~/components/layout/Toast";
import OneColumn from "./OneColumn";
import PageTitle from "./PageTitle";
import PasswordForm from "./PasswordForm";

interface Props {
  readonly showToast: boolean,
  readonly toastOnClose: () => void,
  readonly toastVariant: ToastVariant,
  readonly toastMessage: string
  readonly onPasswordValidation: (values: FormType) => object | Promise<object>;
  readonly onSetPasswordSubmit: (values: FormType) => Promise<void>;
}

export default ({ 
  showToast, 
  toastOnClose,
  toastVariant,
  toastMessage,
  onSetPasswordSubmit, 
  onPasswordValidation 
}: Props): JSX.Element => {
  return (
    <OneColumn>
      <PageTitle />
      <PasswordForm onSubmit={onSetPasswordSubmit} validation={onPasswordValidation} />
      <Toast 
        open={showToast} 
        onClose={toastOnClose} 
        variant={toastVariant} 
        message={toastMessage} 
      />
    </OneColumn>
  );
};
