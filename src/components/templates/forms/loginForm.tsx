import React from "react";

import * as FormComponents from "../../compoundComponents/form";
import { NextButton } from "../../subComponents/buttons";
import { Description } from "../../subComponents/typography";

interface FormProp {
  readonly onNext: () => any;
}

export const LoginForm = (props: FormProp) => {
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
      <Description>Log in to your IOV wallet</Description>
      <FormComponents.InputField
        title="Password"
        type="password"
        placeholder="Your Password"
        notification="Passwords must be at least 6 characters long"
      />
    </div>
  );
  return <FormComponents.FormStructure title="Login" content={content} actions={nextButton} />;
};
