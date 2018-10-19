import React from "react";

import { storiesOf } from "@storybook/react";

import { TextInput, TextInputWithUnit, TextArea } from "../src/components/subComponents/input";

storiesOf("Input", module)
  .add("Noramal TextInput", () => <TextInput />)
  .add("Right Aligned TextInput", () => <TextInput align="right" />)
  .add("Input with Unit", () => <TextInputWithUnit unit="*iov.value" />)
  .add("Text Area", () => <TextArea />);
