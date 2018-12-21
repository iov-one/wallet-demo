import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import * as React from "react";
import loading from "~/components/Header/assets/loading.svg";
import Block from "~/components/layout/Block";
import Hairline from "~/components/layout/Hairline";
import Img from "~/components/layout/Image";
import Typography from "~/components/layout/Typography";
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
const onGotIt = () => {
  localStorage.setItem(GOT_IT_KEY, "ACCEPTED");
};

const TransactionsMenu = ({ classes, items }: Props) => {
  const hasPendingTxs = items.length > 0;
  const starterClasses = hasPendingTxs ? classes.spin : undefined;
  const starter = (_: boolean) => <Img src={loading} className={starterClasses} alt="Loading Transactions" />;

  const showGotIt = localStorage.getItem(GOT_IT_KEY) === null;

  const GotIt = () => (
    <ListMenu starter={starter} listWidth={274} color={primary}>
      <Block className={classes.root} padding="sm" onClick={onGotIt}>
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
    </ListMenu>
  );

  const Notifications = () => (
    <ListMenu starter={starter} listWidth={274}>
      <ListItem>
        <ListItemText primary="Notifications" />
      </ListItem>
      <Hairline color={border} />
      <Block margin="xxl" />
    </ListMenu>
  );

  return showGotIt ? <GotIt /> : <Notifications />;
};

export default withStyles(styles)(TransactionsMenu);
