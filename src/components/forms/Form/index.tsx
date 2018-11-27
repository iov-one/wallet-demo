import { FormApi, FormState } from "final-form";
import * as React from "react";
import { Form } from "react-final-form";

interface Props {
  readonly onSubmit: (values: object, form: FormApi, callback?: (errors?: object) => void) => object | Promise<object | undefined> | undefined | void;
  readonly children: (restProps: FormState) => JSX.Element;
  readonly validation?: (values: object) => object | Promise<object>;
  readonly initialValues?: object;
  readonly className?: string;
}

const IovForm = ({ onSubmit, validation, initialValues, children, className, ...props }: Props) => (
  <Form
    validate={validation}
    onSubmit={onSubmit}
    initialValues={initialValues}
    render={({ handleSubmit, ...rest }) => (
      <form className={className} onSubmit={handleSubmit}>
        {children(rest)}
      </form>
    )}
    {...props}
  />
);

export default IovForm;
