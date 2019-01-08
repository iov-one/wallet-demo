import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Prompt, Alert } from "../src/components/layout/dialogs";
import ComingSoonIcon from "../src/routes/securityCenter/assets/coming_soon.svg";
import Block from "~/components/layout/Block";
import Field from "~/components/forms/Field";
import Typography from "~/components/layout/Typography";
import TextField from "~/components/forms/TextField";
import { required } from "~/components/forms/validator";

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
  )).add("Prompt", () => (
    <React.Fragment>
      <Prompt showDialog={true} onClose={action("closed")} onSubmit={action("submitted")}>
        <React.Fragment>
          <Typography variant="h4" color="textPrimary">
            Prompt dialog
      </Typography>
          <Block margin="xl" />
          <Block margin="sm">
            <Typography variant="subtitle2" color="textPrimary">
              Current password
            </Typography>
          </Block>
          <Field
            variant="outlined"
            name="currentPassword"
            type="password"
            fullWidth
            component={TextField}
            validate={required}
            placeholder="Current password"
          />
        </React.Fragment>
      </Prompt>
    </React.Fragment>
  ))