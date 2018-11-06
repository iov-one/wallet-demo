import React from "react";

import { storiesOf } from "@storybook/react";

import { Toasts } from "../src/components/compoundComponents/toasts";

storiesOf("Toasts", module)
  .add("Network Errors", () => <Toasts type="network" show />)
  .add("Transaction Fail Errors", () => <Toasts type="transaction" show />)
  .add("Email Verification", () => <Toasts type="emailVerification" show />);
