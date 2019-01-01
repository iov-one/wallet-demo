import * as React from "react";
import Field from "~/components/forms/Field";
import TextField from "~/components/forms/TextField";
import { required } from "~/components/forms/validator";
import { OpenHandler, openHoc, OpenType } from "~/components/hoc/OpenHoc";
import Block from "~/components/layout/Block";
import Typography from "~/components/layout/Typography";
import { MatchMediaContext } from "~/context/MatchMediaContext";
import { PASSWORD_RECOVERY_ROUTE } from "~/routes";
import { history } from "~/store";
import RecoverPassword from "./RecoverPassword";

export const LOGIN_PASS_FIELD = "password";

//Remove line this comment and line below in case if interface will get any memebers
//tslint:disable-next-line:no-empty-interface
interface OuterProps {}

type Props = OpenType & OpenHandler & OuterProps;

interface State {
  readonly showRecoverPassword: boolean;
}

class FormComponent extends React.Component<Props, State> {
  public readonly submitRecoverPassword = (): void => {
    history.push(PASSWORD_RECOVERY_ROUTE);
  };

  public render(): JSX.Element {
    const { open, toggle } = this.props;
    return (
      <MatchMediaContext.Consumer>
    {phone => (
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
          <Typography variant="subtitle1" color="primary" underlined pointer onClick={toggle}>
            Forgot your password?
          </Typography>
        </Block>
        <RecoverPassword show={open} onClose={toggle} onSubmit={this.submitRecoverPassword} />
      </React.Fragment>
      )}
      </MatchMediaContext.Consumer>
    );
  }
}

const FormWithWarning = openHoc<OuterProps>(FormComponent);

export default () => <FormWithWarning />;
