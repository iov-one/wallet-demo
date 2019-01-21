// tslint:disable:no-string-literal
import * as React from "react";
import { connect } from "react-redux";
import { FormType } from "~/components/forms/Form";
import { hasStoredProfile } from "~/logic";
import { BALANCE_ROUTE, LOGIN_ROUTE, SIGNUP_ROUTE } from "~/routes";
import CreateUsername from "~/routes/signupName/components";
import { USERNAME_FIELD } from "~/routes/signupName/components/FormComponent";
import { history } from "~/store";
import actions, { SignupNameActions } from "./actions";
import selector, { SelectorProps } from "./selector";

interface Props extends SignupNameActions, SelectorProps {}

class SignupName extends React.Component<Props> {
  public async componentDidMount(): Promise<void> {
    const { hasIdentity, chainId, accountName, db } = this.props;

    if (!chainId) {
      history.push(SIGNUP_ROUTE);

      return;
    }

    const hasIdentityWithName = hasIdentity && accountName;
    if (hasIdentityWithName) {
      history.push(BALANCE_ROUTE);

      return;
    }

    const hasProfile = await hasStoredProfile(db);
    const hasProfileWithName = hasProfile && accountName;
    if (hasProfileWithName) {
      history.push(LOGIN_ROUTE);

      return;
    }
  }

  public readonly onCreateUsername = async (values: object) => {
    const { setName } = this.props;
    const name = (values as FormType)[USERNAME_FIELD];

    try {
      await setName(name);
    } catch (err) {
      // TODO check if error and show something
      console.log(`SetName failed: ${err}`);
    }
  };

  public componentDidUpdate(prevProps: Props): void {
    const differentName = prevProps.accountName !== this.props.accountName;
    const updatedName = prevProps.accountName === undefined && differentName;
    if (updatedName) {
      history.push(BALANCE_ROUTE);
    }
  }

  public render(): JSX.Element {
    return <CreateUsername connection={this.props.connection} onSubmit={this.onCreateUsername} />;
  }
}

export default connect(
  selector,
  actions,
)(SignupName);
