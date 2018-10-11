import React from "react";

import { storiesOf } from "@storybook/react";

import { CreateWalletForm, SetPasswordForm } from "../src/components/templates/forms";

storiesOf("Forms", module)
  .add("Create Wallet Form", () => <CreateWalletForm />)
  .add("Set Password Form", () => <SetPasswordForm />);
