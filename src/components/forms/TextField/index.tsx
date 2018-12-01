import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import MuiTextField from "@material-ui/core/TextField";
import React from "react";
import { FieldRenderProps } from "react-final-form";
import { lg } from "~/theme/variables";

// Neded for solving a fix in Windows browsers
const overflowStyle = {
  overflow: "hidden",
  width: "100%",
};

const styles = createStyles({
  root: {
    paddingTop: lg,
    paddingBottom: "12px",
    lineHeight: 0,
  },
});

interface Props extends FieldRenderProps, WithStyles<typeof styles> {
  readonly inputAdornment?: { readonly endAdornment: React.ReactNode };
  readonly helperText?: string;
}

class TextFieldElem extends React.PureComponent<Props> {
  public render(): JSX.Element {
    const {
      input: { name, onChange, value, ...restInput },
      meta,
      helperText,
      inputAdornment,
      classes,
      ...rest
    } = this.props;
    const helper = value ? helperText : undefined;
    const showError = (meta.touched || !meta.pristine) && !meta.valid;
    const underline = meta.active || (meta.visited && !meta.valid);

    const inputRoot = helper ? classes.root : undefined;
    const inputProps = { ...restInput, autoComplete: "off" };
    const inputRootProps = { ...inputAdornment, disableUnderline: !underline, className: inputRoot };

    return (
      <MuiTextField
        style={overflowStyle}
        {...rest}
        name={name}
        helperText={showError ? meta.error : helper || " "} // blank in order to force to have helper text
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
