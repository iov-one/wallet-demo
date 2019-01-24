import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import classNames from "classnames";
import * as React from "react";
import { StateHandler } from "recompose";
import { OpenType } from "~/components/hoc/OpenHoc";
import Block from "~/components/layout/Block";
import { MatchMediaContext } from "~/context/MatchMediaContext";
import { border, sm } from "~/theme/variables";
import { SelectFieldItem } from "./index";
import SelectOptionsList, { SelectOptionsListProps } from "./SelectOptionsList";

const styles = createStyles({
  container: {
    flexShrink: 0,
  },
  dropdown: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  sendPayment: {
    backgroundColor: "#f7f7f7",
    border: `1px solid ${border}`,
    borderRadius: "5px",
    padding: `0 ${sm}`,
  },
  nonIov: {},
});

export type VariantType = "send-payment" | "non-iov";

export interface SelectInputBodyInterface extends SelectOptionsListProps {
  readonly maxWidth: number;
  readonly action: (value: SelectFieldItem) => () => void;
  readonly children: React.ReactNode;
  readonly variant?: VariantType;
}

interface Props extends SelectInputBodyInterface, WithStyles<typeof styles> {
  readonly toggle: StateHandler<OpenType>;
}

interface State {
  readonly menuRefTarget: HTMLDivElement | null;
}

class SelectInputBody extends React.Component<Props, State> {
  public readonly state = {
    menuRefTarget: null,
  };
  private readonly menuRef = React.createRef<HTMLDivElement>();

  public componentDidMount(): void {
    this.setState(() => ({
      menuRefTarget: this.menuRef.current,
    }));
  }

  public render(): JSX.Element {
    const { phoneHook, maxWidth, classes, open, toggle, children, variant, ...otherProps } = this.props;

    const { menuRefTarget } = this.state;

    const variantDropdown = variant === "send-payment" ? classes.sendPayment : classes.nonIov;

    return (
      <MatchMediaContext.Consumer>
        {phone => {
          const showPhone = phone && phoneHook !== null && open;

          return (
            <Block maxWidth={maxWidth} className={classes.container}>
              <div
                ref={this.menuRef}
                className={classNames(classes.dropdown, variantDropdown)}
                onClick={toggle}
              >
                {children}
              </div>
              <SelectOptionsList
                showPhone={showPhone}
                open={open}
                phoneHook={phoneHook}
                menuRefTarget={menuRefTarget}
                {...otherProps}
              />
            </Block>
          );
        }}
      </MatchMediaContext.Consumer>
    );
  }
}

export default withStyles(styles)(SelectInputBody);
