import FormControl, { FormControlProps } from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import * as React from "react";
import { FieldRenderProps } from "react-final-form";

const style = {
  minWidth: "100%",
};

interface Props extends FieldRenderProps {
  readonly formControlProps: FormControlProps;
  readonly label: string;
}

const SelectInput = ({
  input: { name, value, onChange, ...restInput },
  meta,
  label,
  formControlProps,
  ...rest
}: Props) => {
  const showError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched;
  const inputProps = { ...restInput, name };

  return (
    <FormControl {...formControlProps} error={showError} style={style}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Select {...rest} onChange={onChange} inputProps={inputProps} value={value} />
      {showError && <FormHelperText>{meta.error || meta.submitError}</FormHelperText>}
    </FormControl>
  );
};

export default SelectInput;
