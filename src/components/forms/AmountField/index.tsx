import { InputProps as TsInputProps } from "@material-ui/core/Input";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import MuiTextField from "@material-ui/core/TextField";
import React from "react";
import ReactDOM from "react-dom";
import { FieldRenderProps } from "react-final-form";
import Typography from "~/components/layout/Typography";
import { sm, xxlFontSize } from "~/theme/variables";

const styles = createStyles({
  root: {
    padding: 0,  
    "& * input": {
      textAlign: "right",
      paddingRight: sm,
    },
    "& * fieldset": {
      borderWidth: "0 !important",
    },
  },
  input: {
    fontSize: xxlFontSize,  
  }
});

interface Props extends FieldRenderProps, WithStyles<typeof styles> {
  readonly InputProps?: Partial<TsInputProps>;
  readonly errorHook?: HTMLDivElement | null;
}

class AmountFieldElem extends React.PureComponent<Props> {
  public render(): JSX.Element {
    const {
      input: { name, onChange, value, ...restInput },
      meta,
      InputProps,
      classes,
      errorHook,
      ...rest
    } = this.props;
    const showError = (meta.touched || !meta.pristine) && !meta.valid;

    const inputProps = { ...restInput, autoComplete: "off" };
    const inputRootProps = { ...InputProps, className: classes.input };

    return (
      <React.Fragment>
      <MuiTextField
        {...rest}
        name={name}
        className={classes.root}
        InputProps={inputRootProps}
        inputProps={inputProps}
        onChange={onChange}
        value={value}
      />
      {
        showError && errorHook && ReactDOM.createPortal(
          <Typography variant="subtitle2" color="error">{meta.error}</Typography>,
          errorHook!,
        )
      }
      </React.Fragment>
    );
  }
}

const AmountField = withStyles(styles)(AmountFieldElem);

export default AmountField;
