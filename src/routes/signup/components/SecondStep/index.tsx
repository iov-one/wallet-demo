import * as React from "react";
import { Errors } from "~/components/forms/Form";
import PageColumn from "~/components/pages/PageColumn";
import ExplanationMenuComponent from "./ExplanationMenu";
import FormComponent from "./FormComponent";

const ExplanationMenu = () => <ExplanationMenuComponent />;

interface Props {
  readonly onSubmit: (values: object) => void;
  readonly onBack: () => void;
}

const validate = (_: object) => {
  const errors: Errors = {};

  return errors;
};

export const CreateUsername = ({ onSubmit, onBack }: Props) => (
  <PageColumn
    leftMenu={ExplanationMenu}
    onSubmit={onSubmit}
    onBack={onBack}
    validation={validate}
    primaryTitle="Create"
    secondaryTitle="your unique IOV username"
    subtitle="Share your username with anyone to recieve payments. It’s simple and secure."
    formRender={FormComponent}
  />
);
