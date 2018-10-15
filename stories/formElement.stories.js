import React from "react";

import { storiesOf } from "@storybook/react";

import { InputField } from "../src/components/compoundComponents/form";

storiesOf("Form Elements", module)
  .add("Input Field with Description", () => (
    <InputField title="Your IOV handle" description="(letters, numbers and dashes only)" />
  ))
  .add("Input Field without Description", () => (
    <InputField title="Password" type="password" placeholder="Password" />
  ))
  .add("Input Field with Unit", () => (
    <InputField title="Your IOV handle" description="(letters, numbers and dashes only)" unit="*iov.value" />
  ));
