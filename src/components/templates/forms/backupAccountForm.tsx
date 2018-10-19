import React from "react";

import * as FormComponents from "../../compoundComponents/form";
import { PrimaryButton } from "../../subComponents/buttons";
import { Description } from "../../subComponents/typography";

interface FormProp {
  readonly onNext: () => any;
}

export const BackupAccountForm = (props: FormProp): JSX.Element => {
  const nextButton = (
    <PrimaryButton
      title="Continue"
      onClick={() => {
        props.onNext();
      }}
    />
  );
  const content = (
    <div>
      <Description>
        Write this in a safe place in case you forget your password, or want to move the account to a new
        computer.
      </Description>
      <FormComponents.TextArea placeholder="ocean wall flower chair mountain…" />
    </div>
  );
  return <FormComponents.FormStructure title="Backup account" content={content} actions={nextButton} />;
};
