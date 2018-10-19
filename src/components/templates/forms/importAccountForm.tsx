import React from "react";

import * as FormComponents from "../../compoundComponents/form";
import { NextButton } from "../../subComponents/buttons";
import { Description } from "../../subComponents/typography";

interface FormProp {
  readonly onNext: () => any;
}

export const ImportAccountForm = (props: FormProp): JSX.Element => {
  const nextButton = (
    <NextButton
      title="Continue"
      onClick={() => {
        props.onNext();
      }}
    />
  );
  const content = (
    <div>
      <Description>Please enter the recovery phase to import your account</Description>
      <FormComponents.TextArea placeholder="ocean wall flower chair mountain…" />
    </div>
  );
  return <FormComponents.FormStructure title="Import your account" content={content} actions={nextButton} />;
};
