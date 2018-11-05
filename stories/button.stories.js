import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { Button, SendReceiveButton } from "../src/components/subComponents/buttons";

storiesOf("Buttons", module)
  .add("NextButton", () => <Button type="primary" title="Continue" onClick={action("clicked")} icon="next" />)
  .add("Primary Button", () => <Button type="primary" title="Done" loading onClick={action("clicked")} />)
  .add("Cancel Button", () => <Button type="revert" title="Cancel" />)
  .add("Check Status Button", () => <Button type="primary" checked title="Copied" icon="check" />)
  .add("Send and Receive Button", () => (
    <SendReceiveButton
      onSend={() => {
        action("Send Clicked");
      }}
      onReceive={() => {
        action("Receive Clicked");
      }}
    />
  ));
