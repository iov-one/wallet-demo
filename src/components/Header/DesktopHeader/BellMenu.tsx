import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import * as React from "react";
import bell from "~/components/Header/assets/bell.svg";
import upToDate from "~/components/Header/assets/uptodate.svg";
import Block from "~/components/layout/Block";
import Hairline from "~/components/layout/Hairline";
import Img from "~/components/layout/Image";
import EmptyListIcon from "~/components/templates/menu/EmptyListIcon";
import ListMenu from "~/components/templates/menu/ListMenu";
import { TransNotificationInfo } from "~/logic";
import { border } from "~/theme/variables";

interface Props extends WithStyles<typeof styles> {
  readonly items: ReadonlyArray<TransNotificationInfo>;
}

const styles = createStyles({
  
});

const BellMenu = ({ }: Props) => {
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
      <EmptyListIcon src={upToDate} alt="Up to date Invite friends" text="Up to date Invite friends" />
    </ListMenu>
  );
};

export default withStyles(styles)(BellMenu);
