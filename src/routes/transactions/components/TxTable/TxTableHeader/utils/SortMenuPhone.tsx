import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import ReactDOM from "react-dom";
import { Item } from "~/components/forms/SelectField";
import SelectItems from "~/components/forms/SelectField/SelectItems";
import { OpenHandler, openHoc, OpenType } from "~/components/hoc/OpenHoc";
import Block from "~/components/layout/Block";
import Img from "~/components/layout/Image";
import { showPhone } from "~/utils/reactportals";
import sorting from "../../../../assets/sorting.svg";
import { ORDER_ASC, ORDER_DESC, SortingStateProps, SortOrder, TxsOrder } from "../../../sorting";

export function buildNameFrom(orderBy: TxsOrder, order: SortOrder): string {
  return `${orderBy} ${order === ORDER_ASC ? "ascending" : "descending"}`;
}

interface Outer extends SortingStateProps, WithStyles<typeof styles> {
  readonly phoneHook: HTMLDivElement | null;
  readonly initialItem: string;
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

const items: ReadonlyArray<Item> = [
  { name: buildNameFrom("Date", ORDER_ASC) },
  { name: buildNameFrom("Date", ORDER_DESC) },
  { name: buildNameFrom("Amount", ORDER_ASC) },
  { name: buildNameFrom("Amount", ORDER_DESC) },
];

class SortMenuPhone extends React.PureComponent<Props, State> {
  public readonly state = {
    value: this.props.initialItem,
  };

  public readonly onAction = (value: Item) => () => {
    const { toggle, onSort } = this.props;
    const { name } = value;

    try {
      const parsedName = name.split(" ");
      const orderBy = parsedName[0] === "Date" ? "Date" : "Amount";
      const order = parsedName[1] === "ascending" ? ORDER_ASC : ORDER_DESC;

      this.setState({ value: name }, () => {
        onSort(orderBy, order)();
        toggle();
      });
    } catch (err) {
      console.error(err);
    }
  };

  public render(): JSX.Element {
    const { open, toggle, classes, phoneHook } = this.props;

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

export default withStyles(styles)(openHoc<Outer>(SortMenuPhone));
