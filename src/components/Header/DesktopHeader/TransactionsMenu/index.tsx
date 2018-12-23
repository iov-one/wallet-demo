import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import loading from "~/components/Header/assets/loading.svg";
import Img from "~/components/layout/Image";
import ListMenu from "~/components/templates/menu/ListMenu";
import { PendingNotificationItemProps } from "~/reducers/notification";
import { primary } from "~/theme/variables";
import GotIt from "./GotIt";
import NotificationList from "./NotificationList";

interface Props extends WithStyles<typeof styles> {
  readonly items: ReadonlyArray<PendingNotificationItemProps>;
}

const styles = createStyles({
  spin: {
    animation: "spinKeyframe 5s infinite linear",
  },
  "@keyframes spinKeyframe": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "50%": {
      transform: "rotate(180deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
});

const GOT_IT_KEY = "NOTIFICATIONS_GOT_IT";

interface State {
  readonly showGotIt: boolean;
}

class TransactionsMenu extends React.Component<Props, State> {
  public readonly state = {
    showGotIt: localStorage.getItem(GOT_IT_KEY) === null,
  };

  public readonly onGotIt = () => {
    localStorage.setItem(GOT_IT_KEY, "ACCEPTED");
    this.setState({ showGotIt: false });
  };

  public render(): JSX.Element {
    const { showGotIt } = this.state;
    const { classes, items } = this.props;
    const hasPendingTxs = items.length > 0;
    const starterClasses = hasPendingTxs ? classes.spin : undefined;
    // TODO update once I have the green icon
    const logo = hasPendingTxs ? loading : loading;
    const starter = (_: boolean) => <Img src={logo} className={starterClasses} alt="Loading Transactions" />;

    return (
      <ListMenu starter={starter} color={showGotIt ? primary : "white"} listWidth={320}>
        {showGotIt ? <GotIt onGotIt={this.onGotIt} /> : <NotificationList items={items} />}
      </ListMenu>
    );
  }
}

export default withStyles(styles)(TransactionsMenu);
