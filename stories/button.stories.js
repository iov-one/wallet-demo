import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { BackupAccountButton, Button } from "../src/components/subComponents/buttons";
import { TransactionButtonGroup, VerticalButtonGroup } from "../src/components/compoundComponents/sections";

storiesOf("Buttons", module)
  .add("Next Button", () => (
    <div>
      <Button type="primary" title="Continue" onClick={action("clicked")} icon="next" />
      <Button type="primary" title="Continue" onClick={action("clicked")} icon="next" large />
    </div>
  ))
  .add("Primary Button", () => (
    <div>
      <Button type="primary" title="Done" onClick={action("clicked")} />
      <Button type="primary" title="Done" onClick={action("clicked")} large />
    </div>
  ))
  .add("Loading Button", () => (
    <div>
      <Button type="primary" title="Done" loading onClick={action("clicked")} />
      <Button type="primary" title="Done" loading onClick={action("clicked")} large />
    </div>
  ))
  .add("Cancel Button", () => <Button type="revert" title="Cancel" />)
  .add("Check Status Button", () => (
    <div>
      <Button type="primary" checked title="Copied" icon="check" />
      <Button type="primary" checked title="Copied" icon="check" large />
    </div>
  ))
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
  })
  .add("Backup Account", () => (
    <BackupAccountButton
      onClick={() => {
        console.log("To Backup Account");
      }}
    />
  ));
