import React from "react";

import * as FormComponents from "../../compoundComponents/form";
import { Button } from "../../subComponents/buttons";
import { Description } from "../../subComponents/typography";
import { FormWrapper } from "../../subComponents/wrappers";

interface FormProp {
  readonly onNext: () => any;
}

export const ImportAccountForm = (props: FormProp): JSX.Element => {
  const nextButton = (
    <Button
      type="primary"
      icon="next"
      title="Continue"
      onClick={() => {
        props.onNext();
      }}
    />
  );
  const content = (
    <FormWrapper>
      <Description>Please enter the recovery phase to import your account</Description>
      <FormComponents.TextArea placeholder="ocean wall flower chair mountain…" />
    </FormWrapper>
  );
  return <FormComponents.FormStructure title="Import your account" content={content} actions={nextButton} />;
};
