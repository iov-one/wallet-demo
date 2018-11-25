import { FormApi, FormState } from "final-form";
import * as React from "react";
import { Form } from "react-final-form";

interface Props {
  readonly onSubmit: (values: object, form: FormApi, callback?: (errors?: object) => void) => object | Promise<object | undefined> | undefined | void;
  readonly children: (restProps: FormState) => JSX.Element;
  readonly padding?: number;
  readonly validation?: (values: object) => object | Promise<object>;
  readonly initialValues?: object;
}

const stylesBasedOn = (padding: number): React.CSSProperties => ({
  padding: `0 ${padding}%`,
  flexDirection: "column",
  flex: "1 0 auto",
});

const IovForm = ({ onSubmit, validation, initialValues, children, padding = 0 }: Props) => (
  <Form
    validate={validation}
    onSubmit={onSubmit}
    initialValues={initialValues}
    render={({ handleSubmit, ...rest }) => (
      <form onSubmit={handleSubmit} style={stylesBasedOn(padding)}>
        {children(rest)}
      </form>
    )}
  />
);

export default IovForm;
