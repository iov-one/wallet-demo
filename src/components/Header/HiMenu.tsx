import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Popper from "@material-ui/core/Popper";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import * as React from "react";
import { OpenHandler, openHoc, OpenType } from "~/components/hoc/OpenHoc";
import Block from "~/components/layout/Block";
import Typography from "~/components/layout/Typography";

interface Outer extends WithStyles<typeof styles> {
  readonly hello: string;
}

type Props = OpenType & OpenHandler & Outer;

const styles = createStyles({
  root: {},
  expand: {},
});

class HiMenu extends React.Component<Props> {
  private readonly menuRef = React.createRef<HTMLDivElement>();

  public render(): JSX.Element {
    const { classes, open, hello, clickAway, toggle } = this.props;
    console.log(hello);

    return (
      <React.Fragment>
        <Block className={classes.root} onClick={toggle}>
          <Typography variant="h6">Hi!</Typography>
          <IconButton disableRipple>{open ? <ExpandLess /> : <ExpandMore />}</IconButton>
        </Block>
        <div ref={this.menuRef}>
          <Popper open={open} anchorEl={this.menuRef.current} placement="bottom-end">
            {({ TransitionProps }) => (
              <Grow {...TransitionProps}>
                <ClickAwayListener onClickAway={clickAway} mouseEvent="onClick" touchEvent={false}>
                  <MenuList>
                    <MenuItem>Profile</MenuItem>
                    <MenuItem>My account</MenuItem>
                    <MenuItem>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Grow>
            )}
          </Popper>
        </div>
      </React.Fragment>
    );
  }
}

/*
const enhance = compose<OpenType & OpenHandler & Outer, Outer>(openHoc)
export default withStyles(styles)(enhance(Mock))
*/
export default withStyles(styles)(openHoc<Outer>(HiMenu));
