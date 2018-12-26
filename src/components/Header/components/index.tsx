import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import logoBlack from "~/components/Header/assets/logoBlack.svg";
import BellMenu from "~/components/Header/components/BellMenu";
import HiMenu from "~/components/Header/components/HiMenu";
import Links from "~/components/Header/components/LinksMenu";
import TransactionsMenu from "~/components/Header/components/TransactionsMenu";
import { HeaderPendingTxProps, HeaderTxProps } from "~/components/Header/selector";
import Block from "~/components/layout/Block";
import Hairline from "~/components/layout/Hairline";
import Img from "~/components/layout/Image";
import Spacer from "~/components/layout/Spacer";

const styles = createStyles({
  root: {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    minHeight: "70px",
    backgroundColor: "white",
  },
});

interface Props extends WithStyles<typeof styles> {
  readonly pendingTxs: ReadonlyArray<HeaderPendingTxProps>;
  readonly txs: ReadonlyArray<HeaderTxProps>;
}

class HeaderComponent extends React.Component<Props> {
  public render(): JSX.Element {
    const { classes, pendingTxs, txs } = this.props;

    return (
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
        <Hairline />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(HeaderComponent);
