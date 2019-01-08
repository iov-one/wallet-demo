import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import classNames from "classnames";
import { FormApi, FormState, FormSubscription } from "final-form";
import * as React from "react";
import { Form } from "react-final-form";

export interface FormType {
  readonly [key: string]: string;
}

export interface Errors {
  readonly [key: string]: string;
}

const styles = createStyles({
  form: {
    minHeight: 0,
  },
  grow: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  fullWidth: {
    width: "100%",
  },
});

interface Props extends WithStyles<typeof styles> {
  readonly onSubmit: (
    values: object,
    form: FormApi,
    callback?: (errors?: object) => void,
  ) => object | Promise<object | undefined> | undefined | void;
  readonly children: (restProps: FormState) => JSX.Element;
  readonly validation?: (values: object) => object | Promise<object>;
  readonly initialValues?: object;
  readonly className?: string;
  readonly grow?: boolean;
  readonly fullWidth?: boolean;
  readonly subscription?: FormSubscription;
}

const IovForm = ({
  onSubmit,
  classes,
  grow,
  fullWidth,
  validation,
  initialValues,
  children,
  subscription,
  className,
  ...props
}: Props) => {
  const formClasses = classNames(
    classes.form,
    grow ? classes.grow : undefined,
    fullWidth ? classes.fullWidth : undefined,
    className,
  );

  return (
    <Form
      validate={validation}
      onSubmit={onSubmit}
      subscription={subscription}
      initialValues={initialValues}
      render={({ handleSubmit, ...rest }) => (
        <form className={formClasses} onSubmit={handleSubmit}>
          {children(rest)}
        </form>
      )}
      {...props}
    />
  );
};

export default withStyles(styles)(IovForm);
