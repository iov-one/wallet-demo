import React from "react";
import Field from "~/components/forms/Field";
import TextField from "~/components/forms/TextField";
import { required } from "~/components/forms/validator";
import Block from "~/components/layout/Block";
import { Prompt } from "~/components/layout/dialogs";
import Typography from "~/components/layout/Typography";
import { FormValues } from "../container/index";

interface Props {
  readonly showSetPassword: boolean;
  readonly closeSetPassword: () => void;
  readonly onSubmit: (values: FormValues) => void;
  readonly validation?: (values: object) => object | Promise<object>;
}

const validation = (values: FormValues): object => {
  const errors: any = {};
  if (values.newPassword !== values.confirmPassword) {
    //tslint:disable-next-line:no-object-mutation
    errors.confirmPassword = "The passwords do not match";
  }
  return errors;
};

export default ({ showSetPassword, closeSetPassword, onSubmit }: Props): JSX.Element => (
  <Prompt showDialog={showSetPassword} onClose={closeSetPassword} onSubmit={onSubmit} validation={validation}>
    <React.Fragment>
      <Typography variant="h4" color="textPrimary">
        Change your password
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
      <Block margin="lg" />
      <Block margin="sm">
        <Typography variant="subtitle2" color="textPrimary">
          New password
        </Typography>
      </Block>
      <Field
        variant="outlined"
        name="newPassword"
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
        name="confirmPassword"
        type="password"
        fullWidth
        component={TextField}
        validate={required}
        placeholder="Confirm password"
      />
    </React.Fragment>
  </Prompt>
);
