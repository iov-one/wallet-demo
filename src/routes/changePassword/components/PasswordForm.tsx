import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import { FormState, FormSubscription } from "final-form";
import React from "react";
import Field from "~/components/forms/Field";
import Form from "~/components/forms/Form";
import TextField from "~/components/forms/TextField";
import { required } from "~/components/forms/validator";
import Block from "~/components/layout/Block";
import Button from "~/components/layout/Button";
import Typography from "~/components/layout/Typography";
import { background } from "~/theme/variables";

export const CURRENT_PASSWORD = "currentPassword";
export const NEW_PASSWORD = "newPassword";
export const CONFIRM_PASSWORD = "confirmPassword";

interface Props extends WithStyles<typeof styles> {
  readonly onSubmit: (values: any) => Promise<boolean>;
  readonly validation?: (values: any) => object | Promise<object>;
}

const styles = createStyles({
  input: {
    backgroundColor: background,
  },
});

const subscription: FormSubscription = {
  valid: true,
  submitting: true,
  validating: true,
};

const PasswordForm = ({ onSubmit, validation, classes }: Props) => (
  <Form onSubmit={onSubmit} subscription={subscription} validation={validation} grow fullWidth>
    {({ valid, submitting, validating }: FormState) => (
      <React.Fragment>
        <Block margin="sm">
          <Typography variant="subtitle2" color="textPrimary">
            Current password
          </Typography>
        </Block>
        <Field
          variant="outlined"
          name={CURRENT_PASSWORD}
          type="password"
          fullWidth
          component={TextField}
          validate={required}
          placeholder="Current password"
        />
        <Block margin="lg" />
        <Block margin="sm">
          <Typography variant="subtitle2" color="textPrimary">
            New password
          </Typography>
        </Block>
        <Field
          variant="outlined"
          name={NEW_PASSWORD}
          type="password"
          fullWidth
          component={TextField}
          validate={required}
          placeholder="New password"
        />
        <Block margin="lg" />
        <Block margin="sm">
          <Typography variant="subtitle2" color="textPrimary">
            Confirm password
          </Typography>
        </Block>
        <Field
          variant="outlined"
          name={CONFIRM_PASSWORD}
          type="password"
          fullWidth
          component={TextField}
          validate={required}
          placeholder="Confirm password"
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          disabled={!valid || submitting || validating}
          fullWidth
        >
          Continue
        </Button>
      </React.Fragment>
    )}
  </Form>
);

export default withStyles(styles)(PasswordForm);
