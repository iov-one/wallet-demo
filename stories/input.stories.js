import React from "react";

import { storiesOf } from "@storybook/react";

import { ConfirmInput, FormInput } from "../src/components/compoundComponents/form";
import { SecondaryInput } from "../src/components/subComponents/input";

storiesOf("Input", module)
  .add("Empty Input", () => <FormInput title="Empty" placeholder="IOV or wallet address" />)
  .add("Filled", () => <FormInput title="Filled" value="mazie_nitzsche@rebekah.ca" />)
  .add("Disabled", () => (
    <FormInput title="Disabled" value="1F1tAaz533x18ehdjdjdjekwlrn4354GNn4xq" disabled />
  ))
  .add("Error Message", () => (
    <FormInput
      title="Error message"
      value="mazie_nitzsche@rebekah.ca"
      notification="Sorry, but this email address is already taken"
    />
  ))
  .add("Confirmation Message", () => (
    <ConfirmInput
      title="Confirmation message"
      value="mazie_nitzsche@rebekah.ca"
      notification="Address copied!"
    />
  ))
  .add("Text field 2: active", () => <SecondaryInput placeholder="Add a note" />)
  .add("Text field 2: filled", () => <SecondaryInput value="For the rent" />)
  .add("Text field 2: disabled", () => <SecondaryInput value="No note" disabled />);
