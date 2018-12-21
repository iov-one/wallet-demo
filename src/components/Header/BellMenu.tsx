import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Popper from "@material-ui/core/Popper";
import * as React from "react";
import bell from "~/components/Header/assets/bell.svg";
import upToDate from "~/components/Header/assets/uptodate.svg";
import { OpenHandler, openHoc, OpenType } from "~/components/hoc/OpenHoc";
import Block from "~/components/layout/Block";
import Hairline from "~/components/layout/Hairline";
import Img from "~/components/layout/Image";
import { TransNotificationInfo } from "~/logic";
import { border } from "~/theme/variables";

interface Outer extends WithStyles<typeof styles> {
  readonly items: ReadonlyArray<TransNotificationInfo>;
}

type Props = OpenType & OpenHandler & Outer;

const styles = createStyles({
  root: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  empty: {
    height: "120px",
  },
  center: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
});

class BellMenu extends React.Component<Props> {
  private readonly menuRef = React.createRef<HTMLDivElement>();

  public render(): JSX.Element {
    const { classes, open, clickAway, toggle } = this.props;

    return (
      <React.Fragment>
        <div ref={this.menuRef} className={classes.root} onClick={toggle}>
          <Block padding="xl">
            <Img src={bell} alt="Notifications" />
          </Block>
        </div>
        <Popper open={open} anchorEl={this.menuRef.current} placement="bottom-end">
          {({ TransitionProps }) => (
            <Grow {...TransitionProps}>
              <ClickAwayListener onClickAway={clickAway} mouseEvent={false} touchEvent="onTouchStart">
                <List> 
                  <ListItem>
                    <ListItemText primary="Notifications" />
                  </ListItem>
                  <Hairline color={border} />
                  <ListItem className={classes.center}>
                    <ListItemIcon className={classes.empty}>
                      <Img src={upToDate} alt="Up to date Invite friends" />
                    </ListItemIcon>
                    <ListItemText primary="You are up to date!" />
                  </ListItem>
                </List>
              </ClickAwayListener>
            </Grow>
          )}
        </Popper>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(openHoc<Outer>(BellMenu));
