// tslint:disable:no-string-literal
import * as React from "react";
import { connect } from "react-redux";
import { Errors } from "~/components/forms/Form";
import { BALANCE_ROUTE, SET_NAME_ROUTE, SIGN_UP_ROUTE } from "~/containers/routes";
import CreateUsername from "~/routes/signupName/components";
import { FormUsername, USERNAME_FIELD } from "~/routes/signupName/components/FormComponent";
import { history } from "~/store";
import actions, { SignupNameActions } from "./actions";
import selector, { SelectorProps } from "./selector";

interface Props extends SignupNameActions, SelectorProps {}

class SignupName extends React.Component<Props> {
  public readonly onCreateUsername = async (values: object) => {
    const { chainId, setName } = this.props;
    const name = (values as FormUsername)[USERNAME_FIELD];

    try {
      await setName(name, chainId);
      history.push(BALANCE_ROUTE);
    } catch (err) {
      // TODO check if error and show something
    }

    history.push(SET_NAME_ROUTE);
  };

  public readonly onBack = () => {
    history.push(SIGN_UP_ROUTE);
  };

  public readonly validate = async (_: object) => {
    let errors: Errors = {};

    // const name = values[USERNAME_FIELD];
    const isTaken = false; // await checkTaken(name);
    if (isTaken) {
      errors = { ...errors, [USERNAME_FIELD]: "Name is already taken" };
    }

    return errors;
  };

  public render(): JSX.Element {
    return <CreateUsername validate={this.validate} onBack={this.onBack} onSubmit={this.onCreateUsername} />;
  }
}

export default connect(
  selector,
  actions,
)(SignupName);
