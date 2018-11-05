import React from "react";

import * as FormComponents from "../../compoundComponents/form";
import { Button } from "../../subComponents/buttons";
import { Description } from "../../subComponents/typography";
import { FormWrapper } from "../../subComponents/wrappers";

interface FormProp {
  readonly onNext: () => any;
  readonly onChange: (text: string) => any;
  readonly loading: boolean;
  readonly error: boolean;
  readonly errorMessage: string;
}

export const CreateWalletForm = (props: FormProp): JSX.Element => {
  const { error, errorMessage, loading } = props;
  const nextButton = (
    <Button
      type="primary"
      icon="next"
      title="Continue"
      disabled={error}
      loading={loading}
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
        error={error}
        notification={errorMessage}
      />
    </FormWrapper>
  );
  return (
    <FormComponents.FormStructure title="Create your first wallet" content={content} actions={nextButton} />
  );
};
