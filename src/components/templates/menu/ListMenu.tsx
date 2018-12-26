import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import List from "@material-ui/core/List";
import Popper from "@material-ui/core/Popper";
import * as React from "react";
import ReactDOM from "react-dom";
import { OpenHandler, openHoc, OpenType } from "~/components/hoc/OpenHoc";
import { MatchMediaContext } from "~/context/MatchMediaContext";

interface Outer extends WithStyles<typeof styles> {
  readonly starter: (visited: boolean, open: boolean) => JSX.Element;
  readonly listWidth: number;
  readonly color?: string;
}

type Props = OpenType & OpenHandler & Outer;

const styles = createStyles({
  root: {
    "&:hover": {
      cursor: "pointer",
    },
  },
});

interface ListItemsProps {
  readonly items: React.ReactNode;
  readonly clickAway: () => void;
  readonly style?: React.CSSProperties;
}

const ListItems = ({ items, clickAway, style }: ListItemsProps) => (
  <ClickAwayListener onClickAway={clickAway} mouseEvent="onClick" touchEvent="onTouchStart">
    <React.Fragment>
      <List component="nav" style={style}>
        {items}
      </List>
      ,
    </React.Fragment>
  </ClickAwayListener>
);

const buildListStyleFrom = (width: number, color: string): React.CSSProperties => ({
  width: `${width}px`,
  backgroundColor: color,
});

class ListMenu extends React.Component<Props> {
  private readonly menuRef = React.createRef<HTMLDivElement>();

  public render(): JSX.Element {
    const {
      classes,
      listWidth,
      starter,
      children,
      color = "white",
      open,
      clickAway,
      visited,
      toggle,
    } = this.props;
    const root = document.getElementById("headerPhone");

    return (
      <React.Fragment>
        <div ref={this.menuRef} className={classes.root} onClick={toggle}>
          {starter(visited, open)}
        </div>
        <MatchMediaContext.Consumer>
          {phone => {
            const showPhone = phone && root !== null && open;
            if (showPhone) {
              return ReactDOM.createPortal(<ListItems clickAway={clickAway} items={children} />, root!);
            }

            const style = buildListStyleFrom(listWidth, color);
            return (
              <Popper open={open} anchorEl={this.menuRef.current} placement="bottom-end">
                {({ TransitionProps }) => (
                  <Grow {...TransitionProps}>
                    <ListItems clickAway={clickAway} items={children} style={style} />
                  </Grow>
                )}
              </Popper>
            );
          }}
        </MatchMediaContext.Consumer>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(openHoc<Outer>(ListMenu));
