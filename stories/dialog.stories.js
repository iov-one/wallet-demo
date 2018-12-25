import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Alert } from "../src/components/layout/dialogs";
import ComingSoonIcon from "../src/routes/securityCenter/assets/coming_soon.svg";

storiesOf("Dialogs", module)
  .add("Alert", () => (
    <React.Fragment>
      <Alert
        icon={ComingSoonIcon}
        title="Coming soon..."
        showDialog={true}
        onClose={action("closed")}
      >
        <React.Fragment>Extra security is something we’re working on, stay tuned!</React.Fragment>
      </Alert>
    </React.Fragment>
  ))