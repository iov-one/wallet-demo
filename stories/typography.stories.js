import React from "react";

import { storiesOf } from "@storybook/react";

import {
  H1,
  H2,
  BodyText,
  ToastsText,
  TextFieldLabel,
  PopoverText,
} from "../src/components/subComponents/typography";

storiesOf("Typography", module)
  .add("H1", () => <H1>Main Heading</H1>)
  .add("H2", () => <H2>Heading 2</H2>)
  .add("Body", () => <BodyText>Body</BodyText>)
  .add("Toasts", () => <ToastsText>Toasts</ToastsText>)
  .add("Text field label", () => <TextFieldLabel>Text field label</TextFieldLabel>)
  .add("Pop over", () => <PopoverText>Popover</PopoverText>);
