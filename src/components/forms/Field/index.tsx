import * as React from "react";
import { Field, FieldProps } from "react-final-form";

interface Props extends FieldProps {
  readonly component: any;
}
const IovField = ({ component, ...props }: Props): JSX.Element => <Field component={component} {...props} />;

export default IovField;
