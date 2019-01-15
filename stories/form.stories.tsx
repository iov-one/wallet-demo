import { ChainId } from "@iov/base-types";
import { Amount, TokenTicker } from "@iov/bcp-types";
import { BnsConnection } from "@iov/bns";
import { action } from "@storybook/addon-actions";
import "@storybook/addon-actions/register";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import WebFont from "webfontloader";

import { AddressInputForm, SendTokenForm } from "../src/components/templates/forms";

WebFont.load({
  google: {
    families: ["Muli:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"],
  },
});

storiesOf("Forms", module)
  .add("Address Input Form", () => {
    const chainId: ChainId = "IOV" as ChainId;
    const connection: BnsConnection = {} as BnsConnection;
    return (<AddressInputForm
      onNext={() => {
        action("on next");
      }}
      bnsId={chainId}
      connection={connection}
    />);
  })
  .add("Send Token Form", () => {
    const tokenTicker: TokenTicker = "IOV" as TokenTicker;
    const amount: Amount = {
      fractionalDigits: 9, 
      quantity: "1000000000", 
      tokenTicker: tokenTicker
    }
    const balances: ReadonlyArray<Amount> = new Array(amount);



    return (<SendTokenForm
      name="IOV"
      iovAddress="albert*iov"
      defaultToken={tokenTicker}
      balances={balances}
      onSend={(transactionInfo) => action(transactionInfo)
      }
      onBack={() => action("onBack")}
    />);
  });;
