import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { NextButton, PrimaryButton, SendReceiveButton } from "../src/components/subComponents/buttons";

storiesOf("Buttons", module)
  .add("NextButton", () => <NextButton title="Continue" onClick={action("clicked")} />)
  .add("Primary Button", () => <PrimaryButton title="Done" onClick={action("clicked")} />)
  .add("Send and Receive Button", () => (
    <SendReceiveButton onSend={action("send")} onReceive={action("receive")} />
  ));
