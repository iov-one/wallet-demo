import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Popper from "@material-ui/core/Popper";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import * as React from "react";
import invite from "~/components/Header/assets/invite.svg";
import logout from "~/components/Header/assets/logout.svg";
import { OpenHandler, openHoc, OpenType } from "~/components/hoc/OpenHoc";
import Hairline from "~/components/layout/Hairline";
import Img from "~/components/layout/Image";
import Typography from "~/components/layout/Typography";
import { border, xs } from "~/theme/variables";

interface Outer extends WithStyles<typeof styles> {}

type Props = OpenType & OpenHandler & Outer;

const styles = createStyles({
  root: {
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "pointer",
    },
  },
  chevron: {
    padding: xs,
  },
});

class HiMenu extends React.Component<Props> {
  private readonly menuRef = React.createRef<HTMLDivElement>();

  public render(): JSX.Element {
    const { classes, open, clickAway, toggle } = this.props;

    return (
      <React.Fragment>
        <div ref={this.menuRef} className={classes.root} onClick={toggle}>
          <Typography variant="h6">Hi!</Typography>
          <IconButton className={classes.chevron} disableRipple>
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </div>
        <Popper open={open} anchorEl={this.menuRef.current} placement="bottom-end">
          {({ TransitionProps }) => (
            <Grow {...TransitionProps}>
              <ClickAwayListener onClickAway={clickAway} mouseEvent="onClick" touchEvent={false}>
                <List component="nav">
                  <ListItem button>
                    <ListItemIcon>
                      <Img src={invite} alt="Security Center" />
                    </ListItemIcon>
                    <ListItemText primary="Security Center" />
                  </ListItem>
                  <Hairline color={border} />
                  <ListItem button>
                    <ListItemIcon>
                      <Img src={invite} alt="Invite friends" />
                    </ListItemIcon>
                    <ListItemText primary="Invite friends" />
                  </ListItem>
                  <Hairline color={border} />
                  <ListItem button>
                    <ListItemIcon>
                      <Img src={invite} alt="Terms & Conditions" />
                    </ListItemIcon>
                    <ListItemText primary="Terms & Conditions" />
                  </ListItem>
                  <Hairline color={border} />
                  <ListItem button>
                    <ListItemIcon>
                      <Img src={invite} alt="Privacy Policy" />
                    </ListItemIcon>
                    <ListItemText primary="Privacy Policy" />
                  </ListItem>
                  <Hairline color={border} />
                  <ListItem button>
                    <ListItemIcon>
                      <Img src={logout} alt="Log out" />
                    </ListItemIcon>
                    <ListItemText primary="Log out" />
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

export default withStyles(styles)(openHoc<Outer>(HiMenu));
