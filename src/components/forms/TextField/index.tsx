import { InputProps as TsInputProps } from "@material-ui/core/Input";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import MuiTextField from "@material-ui/core/TextField";
import classNames from "classnames";
import React from "react";
import { FieldRenderProps } from "react-final-form";
import { lg, lightFont } from "~/theme/variables";

const styles = createStyles({
  root: {
    fontWeight: lightFont,
  },
  helper: {
    paddingTop: lg,
    paddingBottom: "12px",
    lineHeight: 0,
  },
});

interface Props extends FieldRenderProps, WithStyles<typeof styles> {
  readonly InputProps?: Partial<TsInputProps>;
  readonly helperText?: string;
}

class TextFieldElem extends React.PureComponent<Props> {
  public render(): JSX.Element {
    const {
      input: { name, onChange, value, ...restInput },
      meta,
      helperText,
      InputProps,
      classes,
      ...rest
    } = this.props;
    const helper = value ? helperText : undefined;
    const showError = (meta.touched || !meta.pristine) && !meta.valid;

    const inputRoot = helper ? classNames(classes.root, classes.helper) : classes.root;
    const inputProps = { ...restInput, autoComplete: "off" };
    const inputRootProps = { ...InputProps, className: inputRoot };

    return (
      <MuiTextField
        {...rest}
        name={name}
        helperText={showError ? meta.error : helper || undefined}
        error={meta.error && (meta.touched || !meta.pristine)}
        InputProps={inputRootProps}
        inputProps={inputProps}
        onChange={onChange}
        value={value}
      />
    );
  }
}

const TextField = withStyles(styles)(TextFieldElem);

export default TextField;
