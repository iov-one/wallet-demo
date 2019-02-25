import { storiesOf } from "@storybook/react";
import * as React from "react";
import { RootMatchMedia } from "~/utils/storybook";
import TermsOfService from "./index";

storiesOf("Routes /terms-of-service", module)
  .add("Terms of Service for desktop", () => (
    <RootMatchMedia matchMedia={false}>
      <TermsOfService />
    </RootMatchMedia>
  ))
  .add("Terms of Service for phones", () => (
    <RootMatchMedia matchMedia={true}>
      <TermsOfService />
    </RootMatchMedia>
  ));
