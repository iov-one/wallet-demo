import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import ReactDOM from "react-dom";
import { Item } from "~/components/forms/SelectField";
import SelectItems from "~/components/forms/SelectField/SelectItems";
import { OpenHandler, openHoc, OpenType } from "~/components/hoc/OpenHoc";
import Block from "~/components/layout/Block";
import Img from "~/components/layout/Image";
import { showPhone } from "~/utils/reactportals";
import sorting from "../../assets/sorting.svg";
import { ColumnName, SortItem, SortOrder } from "../../common";

export interface SortMenuProps {
  readonly onSetSortOrder: (value: SortItem) => void;
}

interface Outer extends SortMenuProps, WithStyles<typeof styles> {
  readonly items: ReadonlyArray<Item>;
  readonly initial: string;
  readonly phoneHook: HTMLDivElement | null;
}

type Props = OpenType & OpenHandler & Outer;

interface State {
  readonly value: string;
}

const styles = createStyles({
  container: {
    flexShrink: 0,
  },
});

const resetSorting: SortItem = {
  name: "",
  column: ColumnName.NoColumn,
  order: SortOrder.NoOrder,
};

class SortMenu extends React.PureComponent<Props, State> {
  public readonly state = {
    value: this.props.initial,
  };

  public readonly onAction = (value: Item) => () => {
    const { toggle, onSetSortOrder } = this.props;

    if (value.name === this.state.value) {
      this.setState({ value: "" }, () => {
        onSetSortOrder(resetSorting);
      });
    } else {
      this.setState({ value: value.name }, () => {
        onSetSortOrder(value as SortItem);
      });
    }

    toggle();
  };

  public render(): JSX.Element {
    const { open, toggle, classes, items, phoneHook } = this.props;

    return (
      <Block className={classes.container}>
        <Img src={sorting} width={24} height={24} alt="Sorting" onClick={toggle} />
        {showPhone(true, phoneHook, open) &&
          ReactDOM.createPortal(
            <SelectItems
              selectedItem={this.state.value}
              align="left"
              items={items}
              action={this.onAction}
              phone
            />,
            phoneHook!,
          )}
      </Block>
    );
  }
}

export default withStyles(styles)(openHoc<Outer>(SortMenu));
