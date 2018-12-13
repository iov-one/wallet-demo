import * as React from "react";
import { Errors } from "~/components/forms/Form";
import PageColumn from "~/components/pages/PageColumn";
import FormComponent from "./FormComponent";
import PeopleImg from "./LeftMenu";
import LoginComponent from "./LoginComponent";

const LoginSection = () => <LoginComponent />;

interface Props {
  readonly onSubmit: (values: object) => void;
}

const validate = (values: any) => {
  let errors: Errors = {};
  if (values.password !== values.confirmPassword) {
    errors = { ...errors, confirmPassword: "Passwords do not match" };
  }

  return errors;
};

const CreateAccount = ({ onSubmit }: Props) => (
  <PageColumn
    icon="white"
    leftMenu={PeopleImg}
    onSubmit={onSubmit}
    validation={validate}
    primaryTitle="Get started"
    secondaryTitle="Sign up for your IOV wallet below"
    subtitle="Sign up for your IOV wallet below"
    renderHeader={LoginSection}
    formRender={FormComponent}
    nextMsg="Continue"
  />
);

export default CreateAccount;
