import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import * as React from "react";
import loading from "~/components/Header/assets/loading.svg";
import noPendingTxs from "~/components/Header/assets/noPendingTxs.svg";
import Block from "~/components/layout/Block";
import Hairline from "~/components/layout/Hairline";
import Img from "~/components/layout/Image";
import Typography from "~/components/layout/Typography";
import EmptyListIcon from "~/components/templates/menu/EmptyListIcon";
import ListMenu from "~/components/templates/menu/ListMenu";
import { PendingNotificationItemProps } from "~/reducers/notification";
import { border, primary } from "~/theme/variables";

interface Props extends WithStyles<typeof styles> {
  readonly items: ReadonlyArray<PendingNotificationItemProps>;
}

const styles = createStyles({
  root: {
    color: "white",
    display: "flex",
    flexDirection: "column",
    "&:hover": {
      cursor: "pointer",
    },
  },
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
    const { classes, items } = this.props;
    const hasPendingTxs = items.length > 0;
    const starterClasses = hasPendingTxs ? classes.spin : undefined;
    const starter = (_: boolean) => (
      <Img src={loading} className={starterClasses} alt="Loading Transactions" />
    );

    const { showGotIt } = this.state;

    const GotIt = () => (
      <React.Fragment>
        <Block className={classes.root} padding="sm" onClick={this.onGotIt}>
          <Block margin="md">
            <Typography variant="body1" color="inherit">
              To be used as helper throughout the experience
            </Typography>
          </Block>
          <Block align="right">
            <Typography variant="body1" color="inherit" underlined>
              Got it
            </Typography>
          </Block>
        </Block>
      </React.Fragment>
    );

    const Notifications = () => (
      <React.Fragment>
        <ListItem>
          <ListItemText primary="Notifications" />
        </ListItem>
        <Hairline color={border} />
        {items.length === 0 && (
          <EmptyListIcon src={noPendingTxs} alt="No Pending Transactions" text="You are up to date!" />
        )}
        {items.map((item: PendingNotificationItemProps) => (
          <React.Fragment>
            <ListItem>
              <CircularProgress />
              <ListItemText
                primary={`${item.amount.whole}.${item.amount.fractional} to ${item.receiver}`}
                secondary="... Sending"
              />
            </ListItem>
            <Hairline />
          </React.Fragment>
        ))}
      </React.Fragment>
    );

    return (
      <ListMenu starter={starter} color={showGotIt ? primary : "white"} listWidth={320}>
        {showGotIt ? <GotIt /> : <Notifications />}
      </ListMenu>
    );
  }
}

export default withStyles(styles)(TransactionsMenu);
