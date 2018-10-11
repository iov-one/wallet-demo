import React from "react";

import { storiesOf } from "@storybook/react";

import {
  H1,
  Description,
  FieldLabel,
  TokenValue,
  AccountName,
} from "../src/components/subComponents/typography";

storiesOf("Typography", module)
  .add("H1", () => <H1>Create your first wallet</H1>)
  .add("Description", () => (
    <Description>
      Choose an unique address you’ll use to sign in to IOV, send and receive payments
    </Description>
  ))
  .add("FieldLabel with Description", () => (
    <FieldLabel title="Your IOV handle" description="letters, numbers and dashes only" />
  ))
  .add("FieldLabel without Description", () => <FieldLabel title="Your IOV handle" />)
  .add("Token Value", () => (
    <TokenValue amount="100.00" tokenUnit="IOV" info="Lisk is the native token of the Lisk blockchain" />
  ))
  .add("Account Name", () => <AccountName>victor*iov.value</AccountName>);
