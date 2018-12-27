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
import ListMenu, { PhoneHook } from "~/components/templates/menu/ListMenu";
import { border } from "~/theme/variables";
import TxItem from "./TxItem";

interface Props extends PhoneHook {
  readonly items: ReadonlyArray<HeaderTxProps>;
}

const BellMenu = ({ items, ...rest }: Props) => {
  const starter = (visited: boolean, _: boolean) => {
    const logo = visited ? bell : bell;

    return (
      <Block padding="xl">
        <Img src={logo} alt="Notifications" />
      </Block>
    );
  };

  const hasItems = items.length > 0;

  return (
    <ListMenu starter={starter} listWidth={324} {...rest}>
      <ListItem>
        <ListItemText primary="Notifications" />
      </ListItem>
      <Hairline color={border} />
      {hasItems ? (
        items.map((item: HeaderTxProps, index: number) => {
          const lastOne = index + 1 === items.length;
          return (
            <React.Fragment key={item.id}>
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

export default BellMenu;
