import React from "react";

import * as FormComponents from "../../compoundComponents/form";
import { Button } from "../../subComponents/buttons";
import { Description } from "../../subComponents/typography";
import { FormWrapper } from "../../subComponents/wrappers";

interface FormProp {
  readonly onNext: () => any;
}

export const LoginForm = (props: FormProp) => {
  const nextButton = (
    <Button
      type="next"
      title="Continue"
      onClick={() => {
        props.onNext();
      }}
    />
  );
  const content = (
    <FormWrapper>
      <Description>Log in to your IOV wallet</Description>
      <FormComponents.InputField
        title="Password"
        type="password"
        placeholder="Your Password"
        notification="Passwords must be at least 6 characters long"
      />
    </FormWrapper>
  );
  return <FormComponents.FormStructure title="Login" content={content} actions={nextButton} />;
};
