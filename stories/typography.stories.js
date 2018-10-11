import React from "react";

import { storiesOf } from "@storybook/react";

import { H1, Description, FieldLabel } from "../src/components/subComponents/typography";

storiesOf("Headings", module)
  .add("H1", () => <H1>Create your first wallet</H1>)
  .add("Description", () => (
    <Description>
      Choose an unique address you’ll use to sign in to IOV, send and receive payments
    </Description>
  ))
  .add("FieldLabel", () => (
    <FieldLabel title="Your IOV handle" description="letters, numbers and dashes only" />
  ));
