import React from "react";

import * as FormComponents from "../../compoundComponents/form";
import { Button } from "../../subComponents/buttons";
import { BackupPhrase, Description } from "../../subComponents/typography";
import { FormWrapper } from "../../subComponents/wrappers";

interface FormProp {
  readonly onNext: () => any;
}

export const BackupAccountForm = (props: FormProp): JSX.Element => {
  const nextButton = (
    <Button
      type="primary"
      title="Continue"
      onClick={() => {
        props.onNext();
      }}
    />
  );
  const content = (
    <FormWrapper>
      <Description>
        Write this in a safe place in case you forget your password, or want to move the account to a new
        computer.
      </Description>
      <BackupPhrase>ocean wall flower chair mountain…</BackupPhrase>
    </FormWrapper>
  );
  return <FormComponents.FormStructure title="Backup account" content={content} actions={nextButton} />;
};
