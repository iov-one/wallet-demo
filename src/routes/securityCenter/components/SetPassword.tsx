import React from "react";
import Field from "~/components/forms/Field";
import TextField from "~/components/forms/TextField";
import Block from "~/components/layout/Block";
import { Prompt } from "~/components/layout/dialogs";
import Typography from "~/components/layout/Typography";

interface Props {
  readonly showSetPassword: boolean;
  readonly closeSetPassword: () => void;
}

export default ({ showSetPassword, closeSetPassword }: Props): JSX.Element => (
  <Prompt
    showDialog={showSetPassword}
    onClose={closeSetPassword}
  >
    <React.Fragment>
    <Block padding="xxl" maxWidth={450} margin="xxl">
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
    <Block padding="xxl" maxWidth={450} margin="xl">
      <Typography variant="subtitle1" color="primary" underlined>
        Forgot your password?
      </Typography>
    </Block>
  </React.Fragment>
  </Prompt>
);
