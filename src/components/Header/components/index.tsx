import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import logoBlack from "~/components/Header/assets/logoBlack.svg";
import BellMenu, { BellBadge } from "~/components/Header/components/BellMenu";
import HiMenu from "~/components/Header/components/HiMenu";
import { LinksDesktop } from "~/components/Header/components/LinksMenu";
import TransactionsMenu from "~/components/Header/components/TransactionsMenu";
import Block from "~/components/layout/Block";
import Img from "~/components/layout/Image";
import Spacer from "~/components/layout/Spacer";
import { ProcessedTx, Tx } from "~/store/notifications/state";
import { getLastTx, setLastTx } from "~/utils/localstorage/transactions";

const styles = createStyles({
  root: {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    minHeight: "70px",
    backgroundColor: "white",
  },
});

export interface Props extends WithStyles<typeof styles> {
  readonly phoneMode: boolean;
  readonly pendingTxs: ReadonlyArray<Tx>;
  readonly txs: ReadonlyArray<ProcessedTx>;
  readonly lastTx: ProcessedTx | undefined;
}

interface State {
  readonly phoneHook: HTMLDivElement | null;
  readonly showBadge: boolean;
}

export class HeaderComponent extends React.Component<Props, State> {
  public readonly state = {
    phoneHook: null,
    showBadge: true,
  };
  private readonly phoneHookRef = React.createRef<HTMLDivElement>();

  public readonly calcBellBadgeState = (
    lastTx: ProcessedTx | undefined,
    txIdStorage: string | null,
  ): BellBadge => {
    if (!lastTx) {
      return { showBadge: false, color: "error" };
    }

    if (!txIdStorage) {
      return { lastTx, showBadge: true, color: "primary" };
    }

    if (lastTx.id === txIdStorage) {
      return { lastTx, showBadge: false, color: "error" };
    }

    return { lastTx, showBadge: true, color: "primary" };
  };

  public readonly onSetBellMenuVisited = (lastTxId: string): void => {
    setLastTx(lastTxId);
    this.forceUpdate();
  };

  public componentDidMount(): void {
    this.setState(() => ({
      phoneHook: this.phoneHookRef.current,
    }));
  }

  public render(): JSX.Element {
    const { phoneMode, classes, pendingTxs, txs, lastTx } = this.props;
    const { phoneHook } = this.state;
    const bellBadgeState = this.calcBellBadgeState(lastTx, getLastTx());

    return (
      <React.Fragment>
        <Block className={classes.root} padding={phoneMode ? "lg" : "xxl"}>
          <Img src={logoBlack} alt="Logo" />
          <Spacer order={1} />
          {!phoneMode && <LinksDesktop />}
          <Spacer order={4} />
          <TransactionsMenu phoneHook={phoneHook} phoneMode={phoneMode} items={pendingTxs} />
          <BellMenu
            phoneHook={phoneHook}
            phoneMode={phoneMode}
            items={txs}
            lastTx={lastTx}
            onMenuClicked={this.onSetBellMenuVisited}
            {...bellBadgeState}
          />
          <HiMenu phoneHook={phoneHook} phoneMode={phoneMode} />
        </Block>
        <div ref={this.phoneHookRef} />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(HeaderComponent);
