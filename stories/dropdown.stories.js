import React from "react";

import { storiesOf } from "@storybook/react";

import { Dropdown } from "../src/components/compoundComponents/form";

storiesOf("Dropdown and Notifications", module).add("Dropdown", () => {
  const items = [
    {
      value: "lsk",
      label: "LSK",
      description: "Lisk",
    },
    {
      value: "iov",
      label: "IOV",
      description: "IOV Token",
    },
    {
      value: "eth",
      label: "ETH",
      description: "Ethereum",
    },
  ];
  return <Dropdown trigger="Lisk" items={items} />;
});
