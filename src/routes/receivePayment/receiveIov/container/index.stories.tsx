import { storiesOf } from "@storybook/react";
import * as React from "react";
import { RootMatchMedia } from "~/utils/storybook";
import ReceiveIov from "./index";

storiesOf("Routes /receive-from-iov", module)
  .add("Receive tokens from iov address for desktop", () => (
    <RootMatchMedia matchMedia={false}>
      <ReceiveIov />
    </RootMatchMedia>
  ))
  .add("Receive tokens from iov address for phones", () => (
    <div style={{ display: "flex", flexDirection: "column", width: "425px" }}>
      <RootMatchMedia matchMedia={true}>
        <ReceiveIov />
      </RootMatchMedia>
    </div>
  ));
