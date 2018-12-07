import * as React from "react";
import { Errors } from "~/components/forms/Form";
import PageColumn from "~/components/pages/PageColumn";
import FormComponent from "../FirstStep/FormComponent";
import ExplanationMenuComponent from "./ExplanationMenu";

const ExplanationMenu = () => <ExplanationMenuComponent />;

interface Props {
  readonly onSubmit: (values: object) => void;
}

const validate = (_: object) => {
  const errors: Errors = {};

  return errors;
};

export const CreateUsername = ({ onSubmit }: Props) => (
  <PageColumn
    leftMenu={ExplanationMenu}
    onSubmit={onSubmit}
    validation={validate}
    primaryTitle="Create"
    secondaryTitle="your unique IOV username"
    subtitle="Share your username with anyone to recieve payments. It’s simple and secure."
    formRender={FormComponent}
  />
);
