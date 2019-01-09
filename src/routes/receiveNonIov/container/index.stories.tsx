import { storiesOf } from "@storybook/react";
import * as React from "react";
import { RootMatchMedia } from "~/utils/storybook";
import ReceiveNonIov from "./index";

storiesOf("Routes /receive-external", module)
  .add("Receive tokens from NON iov address for desktop", () => (
    <RootMatchMedia matchMedia={false}>
      <ReceiveNonIov />
    </RootMatchMedia>
  ))
  .add("Receive tokens from NON iov address for phones", () => (
    <div style={{ display: "flex", flexDirection: "column", width: "425px" }}>
      <RootMatchMedia matchMedia={true}>
        <ReceiveNonIov />
      </RootMatchMedia>
    </div>
  ));
