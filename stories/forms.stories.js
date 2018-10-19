import React from "react";

import { storiesOf } from "@storybook/react";

import {
  CreateWalletForm,
  SetPasswordForm,
  LoginForm,
  ImportAccountForm,
  BackupAccountForm,
  SendTokenForm,
} from "../src/components/templates/forms";

storiesOf("Forms", module)
  .add("Create Wallet Form", () => <CreateWalletForm />)
  .add("Set Password Form", () => <SetPasswordForm />)
  .add("Login Form", () => <LoginForm />)
  .add("Import Your Account Form", () => <ImportAccountForm />)
  .add("Backup Account Form", () => <BackupAccountForm />)
  .add("Send Fund", () => {
    const balance = {
      whole: 10,
      fractional: 0,
      tokenTicker: "IOV",
    };
    return <SendTokenForm name="victor*iov.value" balance={balance} />;
  });
