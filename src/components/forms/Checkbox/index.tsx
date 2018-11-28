import MuiCheckbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import * as React from "react";
import { FieldRenderProps } from "react-final-form";

interface Props extends FieldRenderProps, CheckboxProps {
  readonly fontSize?: 'inherit' | 'default' | 'small' | 'large'
}

class Checkbox extends React.PureComponent<Props> {
  public render(): JSX.Element {
    const {
      input: { checked, name, onChange, ...restInput },
      meta,
      fontSize = 'default',
      ...rest
    } = this.props;

    return (
      <MuiCheckbox {...rest} icon={<CheckBoxOutlineBlankIcon fontSize={fontSize} />} checkedIcon={<CheckBoxIcon fontSize={fontSize} />} name={name} inputProps={restInput} onChange={onChange} checked={!!checked} />
    );
  }
}

export default Checkbox;
