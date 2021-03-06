import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import Popper from "@material-ui/core/Popper";
import * as React from "react";
import ReactDOM from "react-dom";
import { FieldRenderProps } from "react-final-form";
import { OpenHandler, openHoc, OpenType } from "~/components/hoc/OpenHoc";
import Block from "~/components/layout/Block";
import Img from "~/components/layout/Image";
import { MatchMediaContext } from "~/context/MatchMediaContext";
import { border, mediumFontSize, sm } from "~/theme/variables";
import { showPhone } from "~/utils/reactportals";
import selectChevron from "./assets/selectChevron.svg";
import SelectItems from "./SelectItems";

export interface Item {
  readonly name: string;
  readonly additionalText?: string;
}

interface Outer extends FieldRenderProps, WithStyles<typeof styles> {
  readonly items: ReadonlyArray<Item>;
  readonly phoneHook: HTMLDivElement | null;
  readonly initial: string;
  readonly width: number;
  readonly align?: "left" | "right";
  readonly onChangeCallback?: (value: Item) => void;
}

type Props = OpenType & OpenHandler & Outer;

interface State {
  readonly value: string;
}

const styles = createStyles({
  container: {
    flexShrink: 0,
  },
  dropdown: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    border: `1px solid ${border}`,
    borderRadius: "5px",
    padding: `0 ${sm}`,
    cursor: "pointer",
  },
  root: {
    fontSize: mediumFontSize,
    height: "32px",
  },
  input: {
    paddingLeft: 0,
    paddingRight: 0,
    textAlign: "center",
    cursor: "pointer",
  },
});

const CHEVRON_WIDTH = 8;

class SelectInput extends React.PureComponent<Props, State> {
  public readonly state = {
    value: this.props.initial,
  };
  private readonly menuRef = React.createRef<HTMLDivElement>();

  public readonly onAction = (value: Item) => () => {
    const {
      input: { onChange },
      toggle,
      onChangeCallback,
    } = this.props;

    this.setState({ value: value.name }, () => {
      const tsOnChange: (value: string) => void = onChange;
      tsOnChange(value.name);
      if (onChangeCallback) {
        onChangeCallback(value);
      }
      toggle();
    });
  };

  public render(): JSX.Element {
    const {
      open,
      toggle,
      classes,
      items,
      phoneHook,
      width,
      align = "left",
      input: { name, value, onChange, ...restInput },
    } = this.props;

    const inputProps = { ...restInput, autoComplete: "off" };

    const maxWidth = width + CHEVRON_WIDTH;

    const popperStyle = {
      marginTop: sm,
    };

    const inputClasses = { root: classes.root, input: classes.input };
    return (
      <MatchMediaContext.Consumer>
        {phone => {
          return (
            <Block maxWidth={maxWidth} className={classes.container}>
              <div ref={this.menuRef} className={classes.dropdown} onClick={toggle}>
                <InputBase
                  name={name}
                  classes={inputClasses}
                  inputProps={inputProps}
                  value={this.state.value}
                  readOnly
                  role="button"
                />
                <Img noShrink src={selectChevron} alt="Phone Menu" width={`${CHEVRON_WIDTH}`} height="5" />
              </div>
              {showPhone(phone, phoneHook, open) ? (
                ReactDOM.createPortal(
                  <SelectItems
                    selectedItem={this.state.value}
                    align={align}
                    phone={phone}
                    items={items}
                    action={this.onAction}
                  />,
                  phoneHook!,
                )
              ) : (
                <Popper
                  open={open}
                  style={popperStyle}
                  anchorEl={this.menuRef.current}
                  placement="bottom-start"
                >
                  {() => (
                    <SelectItems
                      selectedItem={this.state.value}
                      align={align}
                      items={items}
                      action={this.onAction}
                      phone={phone}
                    />
                  )}
                </Popper>
              )}
            </Block>
          );
        }}
      </MatchMediaContext.Consumer>
    );
  }
}

// TODO fix it, probably making more intelligent out Field wrapper
export default withStyles(styles)(openHoc<Outer>(SelectInput)) as any;
