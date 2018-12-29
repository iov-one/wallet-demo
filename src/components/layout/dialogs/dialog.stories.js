import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Block from "~/components/layout/Block";
import Field from "~/components/forms/Field";
import { Alert, Prompt } from "~/components/layout/dialogs";
import Typography from "~/components/layout/Typography";
import TextField from "~/components/forms/TextField";
import { required } from "~/components/forms/validator";
import ComingSoonIcon from "~/routes/securityCenter/assets/coming_soon.svg";
import { RootMatchMedia } from "~/utils/storybook";

storiesOf("Dialogs", module)
  .add("Alert", () => (
    <RootMatchMedia matchMedia={false}>
      <Alert
        icon={ComingSoonIcon}
        title="Coming soon..."
        showDialog={true}
        onClose={action("closed")}
      >
        <React.Fragment>Extra security is something we’re working on, stay tuned!</React.Fragment>
      </Alert>
    </RootMatchMedia>
  )).add("Prompt", () => (
    <RootMatchMedia matchMedia={false}>
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
    </RootMatchMedia>
  ))