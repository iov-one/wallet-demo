import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import List from "@material-ui/core/List";
import Popper from "@material-ui/core/Popper";
import * as React from "react";
import ReactDOM from "react-dom";
import { OpenHandler, openHoc, OpenType } from "~/components/hoc/OpenHoc";

export interface PhoneHook {
  readonly phoneHook: HTMLDivElement | null;
  readonly phoneMode: boolean;
}

interface Outer extends PhoneHook, WithStyles<typeof styles> {
  readonly starter: (visited: boolean, open: boolean) => JSX.Element;
  readonly listWidth: number;
  readonly color?: string;
}

type Props = OpenType & OpenHandler & Outer;

const styles = createStyles({
  root: {
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "pointer",
    },
    "& > div": {
      display: "flex",
    },
  },
});

interface ListItemsProps {
  readonly items: React.ReactNode;
  readonly clickAway: () => void;
  readonly style?: React.CSSProperties;
}

const ListItems = ({ items, clickAway, style }: ListItemsProps) => (
  <Grow>
    <ClickAwayListener onClickAway={clickAway} mouseEvent="onClick" touchEvent={false}>
      <React.Fragment>
        <List component="nav"  style={style}>
          {items}
        </List>
      </React.Fragment>
    </ClickAwayListener>
  </Grow>
);

const buildListStyleFrom = (phoneMode: boolean, width: number, color: string): React.CSSProperties => {
  const pixels = phoneMode ? "inherit" : `${width}px`;

  return {
    width: pixels,
    backgroundColor: color,
  };
};

class ListMenu extends React.Component<Props> {
  private readonly menuRef = React.createRef<HTMLDivElement>();

  public render(): JSX.Element {
    const {
      classes,
      listWidth,
      starter,
      children,
      color = "white",
      phoneHook,
      phoneMode,
      open,
      clickAway,
      visited,
      toggle,
    } = this.props;
    const showPhone = phoneMode && phoneHook !== null && open;
    const style = buildListStyleFrom(phoneMode, listWidth, color);

    return (
      <React.Fragment>
        <div ref={this.menuRef} className={classes.root} onClick={toggle}>
          {starter(visited, open)}
        </div>
        {showPhone ? (
          ReactDOM.createPortal(
            <ListItems clickAway={clickAway} items={children} style={style} />,
            phoneHook!,
          )
        ) : (
          <Popper open={open} anchorEl={this.menuRef.current} placement="bottom-end">
            {() => <ListItems clickAway={clickAway} items={children} style={style} />}
          </Popper>
        )}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(openHoc<Outer>(ListMenu));
