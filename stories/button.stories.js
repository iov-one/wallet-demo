import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { NextButton } from "../src/components/subComponents/buttons";

storiesOf("Buttons", module).add("NextButton", () => (
  <NextButton title="Continue" onClick={action("clicked")} />
));
