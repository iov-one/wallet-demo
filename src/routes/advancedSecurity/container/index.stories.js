import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { RootMatchMedia } from "~/utils/storybook";
import AdvancedSecurity from "./index";

storiesOf("Routes /change-password", module)
  .add("Change password for desktop", () => (
    <RootMatchMedia matchMedia={false}>
      <AdvancedSecurity />
    </RootMatchMedia>
  ))
  .add("Change password for phones", () => (
    <RootMatchMedia matchMedia={true}>
      <AdvancedSecurity />
    </RootMatchMedia>
  ));
