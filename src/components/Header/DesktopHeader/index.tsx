import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import logoBlack from "~/components/Header/assets/logoBlack.svg";
import Block from "~/components/layout/Block";
import Img from "~/components/layout/Image";
import Spacer from "~/components/layout/Spacer";
import { TransNotificationInfo } from "~/logic";
import { PendingNotificationItemProps } from "~/reducers/notification";
import BellMenu from "./BellMenu";
import HiMenu from "./HiMenu";
import Links from "./Links";
import TransactionsMenu from "./TransactionsMenu";

const styles = createStyles({
  root: {
    alignItems: "center",
    display: "flex",
    flexWrap: "nowrap",
    height: "70px",
    backgroundColor: "white",
  },
});

interface Props extends WithStyles<typeof styles> {
  readonly pendingTxs: ReadonlyArray<PendingNotificationItemProps>;
  readonly txs: ReadonlyArray<TransNotificationInfo>;
}

const Header = ({ classes, txs, pendingTxs }: Props) => (
  <React.Fragment>
    <Block className={classes.root} padding="xxl">
      <Img src={logoBlack} alt="Logo" />
      <Spacer order={1} />
      <Links />
      <Spacer order={4} />
      {/* TODO refactor in #96 to include badge using IconGroup */}
      <TransactionsMenu items={pendingTxs} />
      <BellMenu items={txs} />
      <HiMenu />
    </Block>
  </React.Fragment>
);

export default withStyles(styles)(Header);
