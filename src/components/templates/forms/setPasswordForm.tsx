import React from "react";

import * as FormComponents from "../../compoundComponents/form";
import { NextButton } from "../../subComponents/buttons";
import { Description } from "../../subComponents/typography";

export const SetPasswordForm = () => {
  const nextButton = (
    <NextButton
      title="Continue"
      onClick={() => {
        console.log("action");
      }}
    />
  );
  const content = (
    <div>
      <Description>Choose a password for signing in to your IOV wallet.</Description>
      <FormComponents.InputField title="Password" type="password" placeholder="Your Password" />
      <FormComponents.InputField
        title="Confirm password"
        type="password"
        placeholder="Confirm"
        notification="Passwords must be at least 6 characters long"
      />
    </div>
  );
  return <FormComponents.FormStructure title="Set your password" content={content} actions={nextButton} />;
};
