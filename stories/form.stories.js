import React from "react";

import WebFont from "webfontloader";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import "@storybook/addon-actions/register";

import { AddressInputForm, BalanceForm } from "../src/components/templates/forms";

WebFont.load({
  google: {
    families: ["Muli:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"],
  },
});

storiesOf("Forms", module)
  .add("Balance Form", () => {
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
  })
  .add("Address Input Form", () => (
    <AddressInputForm
      onNext={() => {
        action("on next");
      }}
    />
  ));
