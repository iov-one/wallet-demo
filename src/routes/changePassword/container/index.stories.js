import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { RootMatchMedia } from "~/utils/storybook";
import ChangePassword from "./index";

storiesOf("Routes /change-password", module)
  .add("Change password for desktop", () => (
    <RootMatchMedia matchMedia={false}>
      <ChangePassword showToast={action("show toast")} />
    </RootMatchMedia>
  ))
  .add("Change password for phones", () => (
    <RootMatchMedia matchMedia={true}>
      <ChangePassword showToast={action("show toast")} />
    </RootMatchMedia>
  ));
