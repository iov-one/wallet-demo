import React from "react";

import { storiesOf } from "@storybook/react";

import { Dropdown } from "../src/components/compoundComponents/form";
import {
  PendingOnboarding,
  PendingTransactions,
  TransactionNotification,
} from "../src/components/compoundComponents/notifications";

storiesOf("Dropdown and Notifications", module)
  .add("Dropdown", () => {
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
    return <Dropdown defaultValue="lsk" items={items} />;
  })
  .add("Dropdown without defaultValue props", () => {
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
    return <Dropdown items={items} />;
  })
  .add("Pending Onboarding Notification", () => <PendingOnboarding />)
  .add("Transaction Notification", () => {
    const items = [
      {
        received: true,
        sender: "george*iov",
        receiver: "me",
        amount: {
          whole: 100,
          fractional: 5,
          tokenTicker: "LSK",
        },
        time: "1h",
      },
      {
        received: false,
        sender: "me",
        receiver: "alex*iov",
        amount: {
          whole: 100,
          fractional: 5,
          tokenTicker: "IOV",
        },
        time: "3d",
      },
    ];
    return <TransactionNotification items={items} />;
  })
  .add("Pending Transactions", () => {
    const items = [
      {
        receiver: "alex*iov",
        amount: {
          whole: 100,
          fractional: 5,
          tokenTicker: "IOV",
        },
      },
    ];
    return <PendingTransactions items={items} />;
  });
