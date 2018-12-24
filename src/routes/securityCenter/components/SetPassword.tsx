import { FormState, FormSubscription } from "final-form";
import React from "react";
import Field from "~/components/forms/Field";
import Form from "~/components/forms/Form";
import TextField from "~/components/forms/TextField";
import { required } from "~/components/forms/validator";
import Block from "~/components/layout/Block";
import Button from "~/components/layout/Button";
import { Prompt } from "~/components/layout/dialogs";
import Typography from "~/components/layout/Typography";

interface Props {
  readonly showSetPassword: boolean;
  readonly closeSetPassword: () => void;
  readonly onSubmit: (values: object) => void;
  readonly validation?: (values: object) => object | Promise<object>;
}

const subscription: FormSubscription = {
  valid: true,
  submitting: true,
  validating: true,
};

export default ({ showSetPassword, closeSetPassword, onSubmit, validation }: Props): JSX.Element => (
  <Prompt showDialog={showSetPassword} onClose={closeSetPassword}>
    <Form onSubmit={onSubmit} subscription={subscription} validation={validation} grow>
      {({ valid, submitting, validating }: FormState) => (
        <React.Fragment>
          <Block padding="xxl" maxWidth={450} margin="xxl">
            <Block margin="sm">
              <Typography variant="subtitle2" color="textPrimary">
                Password
              </Typography>
            </Block>
            <Field
              variant="outlined"
              name="field_1"
              type="password"
              fullWidth
              component={TextField}
              validate={required}
              placeholder="Your password"
            />
          </Block>
          <Button
            variant="continue"
            color="primary"
            type="submit"
            disabled={!valid || submitting || validating}
            size="large"
          >
            Got it
          </Button>
        </React.Fragment>
      )}
    </Form>
  </Prompt>
);
