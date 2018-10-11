import React from "react";

import * as FormComponents from "../../compoundComponents/form";
import { NextButton } from "../../subComponents/buttons";
import { Description } from "../../subComponents/typography";

export const CreateWalletForm = () => {
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
      <Description>
        Choose an unique address you’ll use to sign in to IOV, send and receive payments
      </Description>
      <FormComponents.InputField
        title="Your IOV handle"
        description="letters, numbers and dashes only"
        unit="*iov.value"
      />
    </div>
  );
  return (
    <FormComponents.FormStructure title="Create your first wallet" content={content} actions={nextButton} />
  );
};
