import { storiesOf } from "@storybook/react";
import * as React from "react";
import { RootMatchMedia } from "~/utils/storybook";
import PasswordRecovery from "./index";

storiesOf("Routes /password-recovery", module)
  .add("Password Recovery for desktop", () => (
    <RootMatchMedia matchMedia={false}>
      <PasswordRecovery />
    </RootMatchMedia>
  ))
  .add("Password Recovery for phones", () => (
    <RootMatchMedia matchMedia={true}>
      <PasswordRecovery />
    </RootMatchMedia>
  ));
