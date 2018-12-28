import * as React from "react";
import Field from "~/components/forms/Field";
import TextField from "~/components/forms/TextField";
import { required } from "~/components/forms/validator";
import Block from "~/components/layout/Block";
import Typography from "~/components/layout/Typography";

export const LOGIN_PASS_FIELD = "password";

interface State {
  readonly showRecoverPassword: boolean;
}

class FormComponent extends React.Component<{}, State> {
  public readonly state = {
    showRecoverPassword: false,
  };

  public readonly onRecoverPassword = (): void => {
    this.setState({
      showRecoverPassword: true,
    });
  };
  public readonly closeRecoverPassword = (): void => {
    this.setState({
      showRecoverPassword: false,
    });
  };

  public readonly submitRecoverPassword = (): void => {
    console.log("Proceed with recovery");
    this.closeRecoverPassword();
  };

  public render(): JSX.Element {
    return (
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
          <Typography variant="subtitle1" color="primary" underlined pointer onClick={this.onRecoverPassword}>
            Forgot your password?
          </Typography>
        </Block>
      </React.Fragment>
    );
  }
}

export default () => <FormComponent />;
