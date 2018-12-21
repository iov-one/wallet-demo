import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import * as React from "react";
import bell from "~/components/Header/assets/bell.svg";
import upToDate from "~/components/Header/assets/uptodate.svg";
import Block from "~/components/layout/Block";
import Hairline from "~/components/layout/Hairline";
import Img from "~/components/layout/Image";
import ListMenu from "~/components/templates/menu/ListMenu";
import { TransNotificationInfo } from "~/logic";
import { border } from "~/theme/variables";

interface Props extends WithStyles<typeof styles> {
  readonly items: ReadonlyArray<TransNotificationInfo>;
}

const styles = createStyles({
  empty: {
    height: "120px",
  },
  center: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
});

const BellMenu = ({ classes }: Props) => {
  const starter = (_: boolean) => (
    <Block padding="xl">
      <Img src={bell} alt="Notifications" />
    </Block>
  );

  return (
    <ListMenu starter={starter} listWidth={324}>
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
    </ListMenu>
  );
};

export default withStyles(styles)(BellMenu);
