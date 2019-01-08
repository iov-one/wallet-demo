import * as React from "react";
import Field from "~/components/forms/Field";
import TextField from "~/components/forms/TextField";
import { required, validEmail } from "~/components/forms/validator";
import Block from "~/components/layout/Block";
import Typography from "~/components/layout/Typography";
import { MatchMediaContext } from "~/context/MatchMediaContext";
import PolicySection from "./PolicySection";

export const PASSWORD_FIELD = "password";

const FormComponent = () => (
  <MatchMediaContext.Consumer>
    {phone => (
      <React.Fragment>
        <Block padding={ phone ? "lg" : "xxl"} maxWidth={450} margin="xl">
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
        <Block padding={ phone ? "lg" : "xxl"} maxWidth={450} margin="xl">
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
        <Block padding={ phone ? "lg" : "xxl"} maxWidth={450} margin="xl">
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
        <Block padding={ phone ? "lg" : "xxl"} margin="xxl">
          <PolicySection />
        </Block>
      </React.Fragment>
    )}
  </MatchMediaContext.Consumer>
);

export default FormComponent;
