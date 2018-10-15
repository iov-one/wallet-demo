import React from "react";

import { storiesOf } from "@storybook/react";

import { AccountInfoSection } from "../src/components/templates/sections";

storiesOf("Sections", module).add("Account Info", () => {
  const balances = [
    { amount: "10,00", tokenUnit: "IOV", info: "IOV is the native token of the IOV blockchain" },
    { amount: "0,00", tokenUnit: "LSK", info: "LSK is the native token of the Lisk blockchain" },
  ];
  return <AccountInfoSection name="victor*iov.value" balances={balances} />;
});
