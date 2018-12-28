import * as React from "react";
import PageColumn from "~/components/pages/PageColumn";
import FormComponent from "./FormComponent";
import PeopleImg from "./LeftMenu";
import SignupComponent from "./SignupComponent";

const SignupSection = () => <SignupComponent />;


export default class Layout extends React.Component {
  public shouldComponentUpdate(): boolean {
    return false;
  }

  public render(): JSX.Element {

    return (
      <React.Fragment>
        <PageColumn
          icon="white"
          leftMenu={PeopleImg}
          onSubmit={() => true}
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
