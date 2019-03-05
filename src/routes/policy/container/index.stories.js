import { storiesOf } from "@storybook/react";
import * as React from "react";
import { RootMatchMedia } from "~/utils/storybook";
import Policy from "./index";

storiesOf("Routes /policy", module)
  .add("Privacy Policy for desktop", () => (
    <RootMatchMedia matchMedia={false}>
      <Policy />
    </RootMatchMedia>
  ))
  .add("Privacy Policy for phones", () => (
    <RootMatchMedia matchMedia={true}>
      <Policy />
    </RootMatchMedia>
  ));
