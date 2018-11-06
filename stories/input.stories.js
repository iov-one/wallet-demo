import React from "react";

import { storiesOf } from "@storybook/react";

import { FormInput } from "../src/components/compoundComponents/form";

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
    <FormInput
      title="Confirmation message"
      type="confirm"
      value="mazie_nitzsche@rebekah.ca"
      notification="Address copied!"
    />
  ));
