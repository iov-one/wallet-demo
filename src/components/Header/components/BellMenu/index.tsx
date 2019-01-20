import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import * as React from "react";
import bell from "~/components/Header/assets/bell.svg";
import bellGreen from "~/components/Header/assets/bellGreen.svg";
import upToDate from "~/components/Header/assets/uptodate.svg";
import BadgeIcon from "~/components/layout/BadgeIcon";
import Block from "~/components/layout/Block";
import Hairline from "~/components/layout/Hairline";
import Typography from "~/components/layout/Typography";
import EmptyListIcon from "~/components/templates/menu/EmptyListIcon";
import ListMenu, { PhoneHook } from "~/components/templates/menu/ListMenu";
import { ProcessedTx } from "~/store/notifications/state";
import { border } from "~/theme/variables";
import TxItem from "./TxItem";

type LastTxType = ProcessedTx | undefined;
interface Props extends PhoneHook {
  readonly items: ReadonlyArray<ProcessedTx>;
  readonly lastTx: LastTxType;
}

const LAST_TX_ID = "LAST_TX_ID";

interface State {
  readonly visited: boolean;
}

class BellMenu extends React.Component<Props, State> {
  public readonly state = {
    visited: false,
  };

  public readonly componentDidMount = (): void => {
    const lastTxId = localStorage.getItem(LAST_TX_ID);
    if (!lastTxId || !this.props.lastTx) {
      return;
    }

    if (lastTxId === this.props.lastTx.id) {
      this.setState({
        visited: true,
      });
    }
  };

  public readonly componentDidUpdate = (prevProps: Props): void => {
    if (!this.props.lastTx) {
      return;
    }

    if (!prevProps.lastTx || prevProps.lastTx.id !== this.props.lastTx.id) {
      this.setState({
        visited: false,
      });
      localStorage.removeItem(LAST_TX_ID);
    }
  };

  public readonly menuClicked = () => {
    this.setState({
      visited: true,
    });

    if (this.props.lastTx) {
      localStorage.setItem(LAST_TX_ID, this.props.lastTx.id);
    }
  };

  public render(): JSX.Element {
    const { items, lastTx, phoneMode, ...rest } = this.props;

    const starter = (open: boolean, visited?: boolean) => {
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
      <ListMenu
        starter={starter}
        listWidth={324}
        phoneMode={phoneMode}
        visited={this.state.visited}
        onClick={this.menuClicked}
        {...rest}
      >
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
          items.map((item: ProcessedTx, index: number) => {
            const lastOne = index + 1 === items.length;

            return <TxItem key={item.id} phone={phoneMode} item={item} lastOne={lastOne} />;
          })
        ) : (
          <EmptyListIcon src={upToDate} alt="Up to date Invite friends" text="Up to date Invite friends" />
        )}
      </ListMenu>
    );
  }
}

export default BellMenu;
