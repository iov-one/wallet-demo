import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { Button } from "../src/components/subComponents/buttons";
import { TransactionButtonGroup, VerticalButtonGroup } from "../src/components/compoundComponents/sections";

storiesOf("Buttons", module)
  .add("Next Button", () => (
    <Button type="primary" title="Continue" onClick={action("clicked")} icon="next" />
  ))
  .add("Primary Button", () => <Button type="primary" title="Done" onClick={action("clicked")} />)
  .add("Loading Button", () => <Button type="primary" title="Done" loading onClick={action("clicked")} />)
  .add("Cancel Button", () => <Button type="revert" title="Cancel" />)
  .add("Check Status Button", () => <Button type="primary" checked title="Copied" icon="check" />)
  .add("Disabled Button", () => (
    <Button type="primary" disabled title="Continue" onClick={action("clicked")} icon="next" />
  ))
  .add("Transaction Buttons", () => (
    <TransactionButtonGroup
      onReceive={() => {
        action("onReceive");
      }}
      onSend={() => {
        action("onSend");
      }}
    />
  ))
  .add("Vertical Buttons", () => {
    const buttons = [
      {
        title: "Continue",
        type: "primary",
        onClick: () => {
          action("on Continue");
        },
      },
      {
        title: "Cancel",
        type: "revert",
        onClick: () => {
          action("on Cancel");
        },
      },
    ];
    return <VerticalButtonGroup buttons={buttons} />;
  });
