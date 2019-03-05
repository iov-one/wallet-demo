import { storiesOf } from "@storybook/react";
import * as React from "react";
import { RootMatchMedia } from "~/utils/storybook";
import Terms from "./index";

storiesOf("Routes /terms", module)
  .add("Terms of Service for desktop", () => (
    <RootMatchMedia matchMedia={false}>
      <Terms />
    </RootMatchMedia>
  ))
  .add("Terms of Service for phones", () => (
    <RootMatchMedia matchMedia={true}>
      <Terms />
    </RootMatchMedia>
  ));
