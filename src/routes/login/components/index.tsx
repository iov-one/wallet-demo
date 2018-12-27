import * as React from "react";
import PageColumn from "~/components/pages/PageColumn";
import FormComponent from "./FormComponent";
import PeopleImg from "./LeftMenu";
import RecoverPassword from "./RecoverPassword";
import SignupComponent from "./SignupComponent";

const SignupSection = () => <SignupComponent />;

interface Props {
  readonly showRecoverPassword: boolean;
  readonly onSubmit: (values: object) => void;
  readonly onRecoverPassword: () => void;
  readonly closeRecoverPassword: () => void;
  readonly submitRecoverPassword: () => void;
}

export default class Layout extends React.Component<Props, {}> {
  public shouldComponentUpdate(): boolean {
    return false;
  }

  public render(): JSX.Element {
    const {
      showRecoverPassword,
      onSubmit,
      onRecoverPassword,
      closeRecoverPassword,
      submitRecoverPassword,
    } = this.props;

    return (
      <React.Fragment>
        <PageColumn
          icon="white"
          leftMenu={PeopleImg}
          onSubmit={onSubmit}
          primaryTitle="Welcome"
          secondaryTitle="to your IOV wallet"
          subtitle="Log in to access your account"
          renderHeader={SignupSection}
          formRender={FormComponent(onRecoverPassword)}
          nextMsg="Continue"
        />
        <RecoverPassword
          show={showRecoverPassword}
          onClose={closeRecoverPassword}
          onSubmit={submitRecoverPassword}
        />
      </React.Fragment>
    );
  }
}
