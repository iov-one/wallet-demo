import { storiesOf } from "@storybook/react";
import * as React from "react";
import { RootMatchMedia } from "~/utils/storybook";
import PasswordRecovery from "./index";

storiesOf("Routes /security-center", module)
  .add("Security center for desktop", () => (
    <RootMatchMedia matchMedia={false}>
      <PasswordRecovery />
    </RootMatchMedia>
  ))
  .add("Security center for phones", () => (
    <RootMatchMedia matchMedia={true}>
      <PasswordRecovery />
    </RootMatchMedia>
  ));
