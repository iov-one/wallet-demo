import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import * as React from "react";
import bell from "~/components/Header/assets/bell.svg";
import upToDate from "~/components/Header/assets/uptodate.svg";
import { HeaderTxProps } from "~/components/Header/selector";
import Block from "~/components/layout/Block";
import Hairline from "~/components/layout/Hairline";
import Img from "~/components/layout/Image";
import EmptyListIcon from "~/components/templates/menu/EmptyListIcon";
import ListMenu from "~/components/templates/menu/ListMenu";
import { border } from "~/theme/variables";
import TxItem from "./TxItem";

interface Props extends WithStyles<typeof styles> {
  readonly items: ReadonlyArray<HeaderTxProps>;
}

const styles = createStyles({});

const BellMenu = ({ items }: Props) => {
  const starter = (_: boolean) => (
    <Block padding="xl">
      <Img src={bell} alt="Notifications" />
    </Block>
  );

  const hasItems = items.length > 0;

  return (
    <ListMenu starter={starter} listWidth={324}>
      <ListItem>
        <ListItemText primary="Notifications" />
      </ListItem>
      <Hairline color={border} />
      {hasItems ? (
        items.map((item: HeaderTxProps, index: number) => {
          const lastOne = index + 1 === items.length;
          return (
            <React.Fragment>
              <TxItem item={item} />
              {!lastOne && <Hairline />}
            </React.Fragment>
          );
        })
      ) : (
        <EmptyListIcon src={upToDate} alt="Up to date Invite friends" text="Up to date Invite friends" />
      )}
    </ListMenu>
  );
};

export default withStyles(styles)(BellMenu);
