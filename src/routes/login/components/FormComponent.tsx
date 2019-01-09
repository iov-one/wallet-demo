import * as React from "react";
import Field from "~/components/forms/Field";
import TextField from "~/components/forms/TextField";
import { required } from "~/components/forms/validator";
import Block from "~/components/layout/Block";
import Link from "~/components/layout/Link";
import Typography from "~/components/layout/Typography";
import { MatchMediaContext } from "~/context/MatchMediaContext";
import { PASSWORD_RECOVERY_ROUTE } from "~/routes";

export const LOGIN_PASS_FIELD = "password";

export const FormComponent = () => (
  <MatchMediaContext.Consumer>
    {phone => (
      <React.Fragment>
        <Block padding={phone ? "lg" : "xxl"} maxWidth={450} margin="xxl">
          <Block margin="sm">
            <Typography variant="subtitle2" color="textPrimary">
              Password
        </Typography>
          </Block>
          <Field
            variant="outlined"
            name={LOGIN_PASS_FIELD}
            type="password"
            fullWidth
            component={TextField}
            validate={required}
            placeholder="Your password"
          />
        </Block>
        <Block padding={phone ? "lg" : "xxl"} maxWidth={450} margin="xl">
          <Link to={PASSWORD_RECOVERY_ROUTE}>
            <Typography variant="subtitle1" color="primary" underlined pointer>
              Forgot your password?
        </Typography>
          </Link>
        </Block>
      </React.Fragment>
    )}
  </MatchMediaContext.Consumer>
);
