import { storiesOf } from "@storybook/react";
import * as React from "react";
import { RootMatchMedia } from "~/utils/storybook";
import SecurityCenter from "./index";

storiesOf("Routes /security-center", module)
  .add("Security center for desktop", () => (
    <RootMatchMedia matchMedia={false}>
      <SecurityCenter />
    </RootMatchMedia>
  ))
  .add("Security center for phones", () => (
    <RootMatchMedia matchMedia={true}>
      <SecurityCenter />
    </RootMatchMedia>
  ));
