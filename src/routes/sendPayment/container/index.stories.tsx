import { storiesOf } from "@storybook/react";
import * as React from "react";
import { RootMatchMedia } from "~/utils/storybook";
import Layout from "./index";

storiesOf("Routes /send-payment", module)
  .add("Send payment for desktop", () => (
    <RootMatchMedia matchMedia={false}>
      <Layout />
    </RootMatchMedia>
  ))
  .add("Send payment for phone", () => (
    <div style={{ display: "flex", flexDirection: "column", width: "425px" }}>
      <RootMatchMedia matchMedia={true}>
        <Layout />
      </RootMatchMedia>
    </div>
  ));
