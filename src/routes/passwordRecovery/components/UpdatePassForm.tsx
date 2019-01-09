import * as React from "react";
import Field from "~/components/forms/Field";
import TextField from "~/components/forms/TextField";
import { required } from "~/components/forms/validator";
import Block from "~/components/layout/Block";
import Typography from "~/components/layout/Typography";

export const LOGIN_PASS_FIELD = "password";
export const CONFIRM_PASS_FIELD = "confirm_password";

export const UpdatePassForm = () => (
  <React.Fragment>
    <Block padding="xxl" maxWidth={450} margin="xxl">
      <Block margin="sm">
        <Typography variant="subtitle2" color="textPrimary">
          Enter your new password
        </Typography>
      </Block>
      <Field
        variant="outlined"
        name={LOGIN_PASS_FIELD}
        type="password"
        fullWidth
        component={TextField}
        validate={required}
        placeholder="Password"
      />
    </Block>
    <Block padding="xxl" maxWidth={450} margin="xxl">
      <Block margin="sm">
        <Typography variant="subtitle2" color="textPrimary">
          Confirm your new password
        </Typography>
      </Block>
      <Field
        variant="outlined"
        name={CONFIRM_PASS_FIELD}
        type="password"
        fullWidth
        component={TextField}
        validate={required}
        placeholder="Password"
      />
    </Block>
  </React.Fragment>
);
