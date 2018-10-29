import React from "react";

import { storiesOf } from "@storybook/react";

import { InputField, TextArea, TextCopy } from "../src/components/compoundComponents/form";

storiesOf("Form Elements", module)
  .add("Input Field with Description", () => (
    <InputField title="Your IOV handle" description="letters, numbers and dashes only" />
  ))
  .add("Input Field without Description", () => (
    <InputField title="Password" type="password" placeholder="Password" />
  ))
  .add("Input Field with Unit", () => (
    <InputField title="Your IOV handle" description="letters, numbers and dashes only" unit="*iov.value" />
  ))
  .add("Input Field with Error State", () => (
    <InputField title="Your IOV handle" notification="Error" error />
  ))
  .add("TextArea without Title", () => <TextArea />)
  .add("TextArea with Title", () => <TextArea title="Title" />)
  .add("TextArea with Description", () => <TextArea title="Title" description="Description" />)
  .add("TextArea with Notification", () => (
    <TextArea title="Title" description="Description" notification="Notification" />
  ))
  .add("TextCopy", () => <TextCopy title="Your IOV address" notification="Link Copied" value="testtest" />);
