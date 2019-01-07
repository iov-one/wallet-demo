import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import * as React from "react";
import bell from "~/components/Header/assets/bell.svg";
import bellGreen from "~/components/Header/assets/bellGreen.svg";
import upToDate from "~/components/Header/assets/uptodate.svg";
import { HeaderTxProps } from "~/components/Header/selector";
import BadgeIcon from "~/components/layout/BadgeIcon";
import Block from "~/components/layout/Block";
import Hairline from "~/components/layout/Hairline";
import Typography from "~/components/layout/Typography";
import EmptyListIcon from "~/components/templates/menu/EmptyListIcon";
import ListMenu, { PhoneHook } from "~/components/templates/menu/ListMenu";
import { border } from "~/theme/variables";
import TxItem from "./TxItem";

type LastTxType = HeaderTxProps | undefined;
interface Props extends PhoneHook {
  readonly items: ReadonlyArray<HeaderTxProps>;
  readonly lastTx: LastTxType;
}

const BellMenu = ({ items, lastTx, phoneMode, ...rest }: Props) => {
  const starter = (visited: boolean, open: boolean) => {
    const logo = open ? bellGreen : bell;
    const hasTx = lastTx !== undefined;
    const showBadge = hasTx && !visited;
    const color = hasTx && lastTx!.success ? "primary" : "error";

    return (
      <Block padding="xl">
        <BadgeIcon color={color} invisible={!showBadge} icon={logo} alt="Transactions" badge="dot" />
      </Block>
    );
  };

  const hasItems = items.length > 0;

  return (
    <ListMenu starter={starter} listWidth={324} phoneMode={phoneMode} {...rest}>
      <Block padding={phoneMode ? "sm" : "xs"}>
        <ListItem>
          <ListItemText disableTypography>
            <Typography variant={phoneMode ? "body1" : "body2"} weight="semibold">
              Notifications
            </Typography>
          </ListItemText>
        </ListItem>
      </Block>
      <Hairline color={border} />
      
        {hasItems ? (
          items.map((item: HeaderTxProps, index: number) => {
            const lastOne = index + 1 === items.length;
            return (
              <React.Fragment key={item.id}>
                <TxItem phone={phoneMode} item={item} />
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
