import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import "@storybook/addon-actions/register";

import { BalanceForm } from "../src/components/templates/forms";

storiesOf("Forms", module).add("Balance Form", () => {
  const balances = [
    {
      whole: 10,
      fractional: 0,
      tokenTicker: "IOV",
      sigFigs: 1,
      tokenName: "IOV Main Token",
    },
    {
      whole: 0,
      fractional: 2,
      tokenTicker: "LSK",
      sigFigs: 1,
      tokenName: "LISK Token",
    },
  ];
  return (
    <BalanceForm
      accountName="victor*iov"
      balances={balances}
      onSend={() => {
        action("On Send");
      }}
      onReceive={() => {
        action("On Receive");
      }}
      onBackup={() => {
        action("On Backup");
      }}
    />
  );
});
