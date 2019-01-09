import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { RootMatchMedia } from "~/utils/storybook";
import RecoveryPhrase from "./index";

storiesOf("Routes /recovery-phrase", module)
  .add("Recovery phrase for desktop", () => (
    <RootMatchMedia matchMedia={false}>
      <RecoveryPhrase />
    </RootMatchMedia>
  ))
  .add("Recovery phrase for phones", () => (
    <RootMatchMedia matchMedia={true}>
      <RecoveryPhrase />
    </RootMatchMedia>
  ));
