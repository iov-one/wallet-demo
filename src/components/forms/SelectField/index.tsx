import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import { FieldRenderProps } from "react-final-form";
import { OpenHandler, openHoc, OpenType } from "~/components/hoc/OpenHoc";
import { mediumFontSize, xxlFontSize } from "~/theme/variables";
import nonIovChevron from "./assets/nonIovChevron.svg";
import selectChevron from "./assets/selectChevron.svg";
import SelectInputBody, { SelectInputBodyInterface, VariantType } from "./SelectInputBody";
import SelectInputField from "./SelectInputField";

const CHEVRON_WIDTH = 8;
const NON_IOV_CHEVRON_WIDTH = 16;

export interface SelectFieldItem {
  readonly value?: string;
  readonly label: string;
  readonly description: string;
}

const styles = createStyles({
  rootSendPayment: {
    fontSize: mediumFontSize,
  },
  inputSendPayment: {
    textAlign: "center",
  },
  rootNonIov: {
    fontSize: xxlFontSize,
  },
  inputNonIov: {
    textAlign: "left",
  },
});

interface Outer extends FieldRenderProps, SelectInputBodyInterface, WithStyles<typeof styles> {
  readonly initial: string;
  readonly width: number;
  readonly onChangeCallback?: (value: SelectFieldItem) => void;
}

type Props = OpenType & OpenHandler & Outer;

interface State {
  readonly value: string;
}

class SelectInput extends React.PureComponent<Props, State> {
  public readonly state = {
    value: this.props.initial,
  };

  public readonly onAction = (value: SelectFieldItem) => () => {
    const {
      input: { onChange },
      toggle,
      onChangeCallback,
    } = this.props;

    this.setState({ value: value.label }, () => {
      onChange(value);
      if (onChangeCallback) {
        onChangeCallback(value);
      }
      toggle();
    });
  };

  public readonly calcMaxWidth = (width: number, variant: VariantType) => {
    return width + (variant === "send-payment" ? CHEVRON_WIDTH : NON_IOV_CHEVRON_WIDTH);
  };

  public render(): JSX.Element {
    const {
      classes,
      width,
      variant = "send-payment",
      input: { name, value, onChange, ...restInput },
      ...otherProps
    } = this.props;

    const inputProps = { ...restInput, autoComplete: "off" };

    return (
      <SelectInputBody action={this.onAction} maxWidth={this.calcMaxWidth(width, variant)} {...otherProps}>
        {variant === "send-payment" ? (
          <SelectInputField
            chevronWidth={CHEVRON_WIDTH}
            chevronHeight={8}
            rootClassNames={classes.rootSendPayment}
            inputClassNames={classes.inputSendPayment}
            selectChevron={selectChevron}
            inputProps={inputProps}
            value={this.state.value}
          />
        ) : (
          <SelectInputField
            chevronWidth={NON_IOV_CHEVRON_WIDTH}
            chevronHeight={10}
            rootClassNames={classes.rootNonIov}
            inputClassNames={classes.inputNonIov}
            selectChevron={nonIovChevron}
            inputProps={inputProps}
            value={this.state.value}
          />
        )}
      </SelectInputBody>
    );
  }
}

// TODO fix it, probably making more intelligent out Field wrapper
export default withStyles(styles)(openHoc<Outer>(SelectInput)) as any;
