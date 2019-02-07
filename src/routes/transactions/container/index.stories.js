import { storiesOf } from "@storybook/react";
import * as React from "react";
import { RootMatchMedia } from "~/utils/storybook";
import Transactions from "./index";

storiesOf("Routes /transactions", module)
  .add("Transactions for desktop", () => (
    <RootMatchMedia matchMedia={false}>
      <Transactions />
    </RootMatchMedia>
  ))
  .add("Transactions for phones", () => (
    <RootMatchMedia matchMedia={true}>
      <Transactions />
    </RootMatchMedia>
  ));
