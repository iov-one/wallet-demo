import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { RootMatchMedia } from "~/utils/storybook";
import AdvancedSecurity from "./index";

storiesOf("Routes /advanced-security", module)
  .add("Advanced security for desktop", () => (
    <RootMatchMedia matchMedia={false}>
      <AdvancedSecurity />
    </RootMatchMedia>
  ))
  .add("Advanced security for phones", () => (
    <RootMatchMedia matchMedia={true}>
      <AdvancedSecurity />
    </RootMatchMedia>
  ));
