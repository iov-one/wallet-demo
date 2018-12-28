import * as React from "react";
import PageColumn from "~/components/pages/PageColumn";
import FormComponent from "./FormComponent";
import PeopleImg from "./LeftMenu";
import SignupComponent from "./SignupComponent";

const SignupSection = () => <SignupComponent />;

interface Props {
  readonly onSubmit: (values: object) => void;
}

export default class Layout extends React.Component<Props, {}> {
  public shouldComponentUpdate(): boolean {
    return false;
  }

  public render(): JSX.Element {
    const { onSubmit } = this.props;

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
          formRender={FormComponent}
          nextMsg="Continue"
        />
      </React.Fragment>
    );
  }
}
