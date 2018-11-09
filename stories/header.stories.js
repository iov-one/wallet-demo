import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { Navigation, HeaderIcon, HeaderDropdown } from "../src/components/subComponents/headers";
import { Header } from "../src/components/compoundComponents/header";

storiesOf("Header", module)
  .add("Navigation", () => {
    const items = [
      {
        label: "Balance",
        onClick: () => {
          console.log("To Balance");
        },
      },
      {
        label: "Payments",
        onClick: () => {
          console.log("To Payments");
        },
      },
    ];
    return <Navigation items={items} />;
  })
  .add("Navigation with active item", () => {
    const items = [
      {
        label: "Balance",
        onClick: () => {
          console.log("To Balance");
        },
      },
      {
        label: "Payments",
        onClick: () => {
          console.log("To Payments");
        },
      },
    ];
    return <Navigation items={items} activeItem="Payments" />;
  })
  .add("Header Icons", () => (
    <div>
      <HeaderIcon icon="bell" /> <HeaderIcon icon="bell" active />
      <HeaderIcon icon="loading" /> <HeaderIcon icon="loading" active />
    </div>
  ))
  .add("Header Dropdown", () => <HeaderDropdown title="Hi!" />)
  .add("Header with first transaction", () => {
    const navigationInfo = {
      items: [
        {
          label: "Balance",
          onClick: () => {
            console.log("To Balance");
          },
        },
        {
          label: "Payments",
          onClick: () => {
            console.log("To Payments");
          },
        },
      ],
      activeItem: "Payments",
    };
    const transactionInfo = {
      items: [
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
      ],
    };
    const pendingTransactionInfo = {
      items: [
        {
          receiver: "alex*iov",
          amount: {
            whole: 100,
            fractional: 5,
            tokenTicker: "IOV",
          },
        },
      ],
    };
    return (
      <Header
        transactionInfo={transactionInfo}
        pendingTransactionInfo={pendingTransactionInfo}
        navigationInfo={navigationInfo}
        isFirst
      />
    );
  })
  .add("Header with pending transaction", () => {
    const navigationInfo = {
      items: [
        {
          label: "Balance",
          onClick: () => {
            console.log("To Balance");
          },
        },
        {
          label: "Payments",
          onClick: () => {
            console.log("To Payments");
          },
        },
      ],
      activeItem: "Payments",
    };
    const transactionInfo = {
      items: [
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
          success: true,
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
          success: false,
        },
      ],
    };
    const pendingTransactionInfo = {
      items: [
        {
          receiver: "alex*iov",
          amount: {
            whole: 100,
            fractional: 5,
            tokenTicker: "IOV",
          },
        },
      ],
    };
    return (
      <Header
        transactionInfo={transactionInfo}
        pendingTransactionInfo={pendingTransactionInfo}
        navigationInfo={navigationInfo}
      />
    );
  })
  .add("Header with loading pending transaction", () => {
    const navigationInfo = {
      items: [
        {
          label: "Balance",
          onClick: () => {
            console.log("To Balance");
          },
        },
        {
          label: "Payments",
          onClick: () => {
            console.log("To Payments");
          },
        },
      ],
      activeItem: "Payments",
    };
    const transactionInfo = {
      items: [
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
          success: true,
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
          success: true,
        },
      ],
    };
    const pendingTransactionInfo = {
      items: [
        {
          receiver: "alex*iov",
          amount: {
            whole: 100,
            fractional: 5,
            tokenTicker: "IOV",
          },
        },
      ],
    };
    return (
      <Header
        transactionInfo={transactionInfo}
        pendingTransactionInfo={pendingTransactionInfo}
        navigationInfo={navigationInfo}
        isFirst
        isLoadingPending
      />
    );
  })
  .add("Header with empty items", () => {
    const navigationInfo = {
      items: [
        {
          label: "Balance",
          onClick: () => {
            console.log("To Balance");
          },
        },
        {
          label: "Payments",
          onClick: () => {
            console.log("To Payments");
          },
        },
      ],
      activeItem: "Payments",
    };
    const transactionInfo = {
      items: [],
    };
    const pendingTransactionInfo = {
      items: [],
    };
    return (
      <Header
        transactionInfo={transactionInfo}
        pendingTransactionInfo={pendingTransactionInfo}
        navigationInfo={navigationInfo}
        isLoadingPending
      />
    );
  });
