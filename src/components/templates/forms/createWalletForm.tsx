import React from "react";

import * as FormComponents from "../../compoundComponents/form";
import { NextButton } from "../../subComponents/buttons";
import { Description } from "../../subComponents/typography";
import { FormWrapper } from "../../subComponents/wrappers";

interface FormProp {
  readonly onNext: () => any;
  readonly onChange: (text: string) => any;
}

export const CreateWalletForm = (props: FormProp): JSX.Element => {
  const nextButton = (
    <NextButton
      title="Continue"
      onClick={() => {
        props.onNext();
      }}
    />
  );
  const content = (
    <FormWrapper>
      <Description>
        Choose an unique address you’ll use to sign in to IOV, send and receive payments
      </Description>
      <FormComponents.InputField
        title="Your IOV handle"
        description="letters, numbers and dashes only"
        unit="*iov.value"
        onChange={(evt: any) => {
          props.onChange(evt.target.value);
        }}
      />
    </FormWrapper>
  );
  return (
    <FormComponents.FormStructure title="Create your first wallet" content={content} actions={nextButton} />
  );
};
