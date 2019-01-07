import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import { RootMatchMedia } from "~/utils/storybook";
import * as React from "react";
import { Toast, ToastVariant } from "./index";

storiesOf("Toasts", module)
  .add("Success", () => (
    <RootMatchMedia matchMedia={false}>
      <Toast open={open} onClose={action("closed")} message="Success toast" variant={ToastVariant.SUCCESS} />
    </RootMatchMedia>
  )).add("Error", () => (
    <RootMatchMedia matchMedia={false}>
      <Toast open={open} onClose={action("closed")} message="Error toast" variant={ToastVariant.ERROR} />
    </RootMatchMedia>
  ))