import * as React from "react";
import Field from "~/components/forms/Field";
import TextField from "~/components/forms/TextField";
import { required, validEmail } from "~/components/forms/validator";
import Block from "~/components/layout/Block";
import Typography from "~/components/layout/Typography";
import PolicySection from "./PolicySection";

export const PASSWORD_FIELD = "password";
export interface FormAccount {
  readonly [key: string]: string;
}

const FormComponent = () => (
  <React.Fragment>
    <Block padding="xxl" maxWidth={450} margin="xl">
      <Block margin="sm">
        <Typography variant="subtitle2" color="textPrimary">
          Email
        </Typography>
      </Block>
      <Field
        variant="outlined"
        name="email"
        type="text"
        fullWidth
        validate={validEmail}
        component={TextField}
        placeholder="Your Email"
      />
    </Block>
    <Block padding="xxl" maxWidth={450} margin="xl">
      <Block margin="sm">
        <Typography variant="subtitle2" color="textPrimary">
          Password
        </Typography>
      </Block>
      <Field
        variant="outlined"
        name={PASSWORD_FIELD}
        type="password"
        fullWidth
        component={TextField}
        validate={required}
        placeholder="Create a password"
      />
    </Block>
    <Block padding="xxl" maxWidth={450} margin="xl">
      <Block margin="sm">
        <Typography variant="subtitle2" color="textPrimary">
          Confirm Password
        </Typography>
      </Block>
      <Field
        variant="outlined"
        name="confirmPassword"
        type="password"
        fullWidth
        component={TextField}
        validate={required}
        placeholder="Repeat your password"
      />
    </Block>
    <Block padding="xxl" margin="xl">
      <PolicySection />
    </Block>
  </React.Fragment>
);

export default FormComponent;
