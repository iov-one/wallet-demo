import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import { ProcessedTx } from "~/store/notifications/state";
import { background, shadowColor } from "~/theme/variables";
import { TxTableProps, TxTableState } from "./rowTxBuilder";
import TxTableFooter from "./TxTableFooter";
import TxTableHeaderDesktop from "./TxTableHeader/TxTableHeaderDesktop";
import TxTableRowDesktop from "./TxTableRow/TxTableRowDesktop";

const styles = createStyles({
  inner: {
    display: "flex",
    flex: "1 0 auto",
    flexDirection: "column",
  },
  outer: {
    display: "flex",
  },
  panel: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: background,
    borderRadius: 4,
    boxShadow: `0 0 20px 0 ${shadowColor}`,
  },
  column: {
    display: "flex",
    flexDirection: "column",
  },
});

interface Props extends TxTableProps, WithStyles<typeof styles> {}

class TxTableDesktopInternal extends React.Component<Props, TxTableState> {
  public readonly state = {
    phoneHook: null,
  };

  private readonly phoneHookRef = React.createRef<HTMLDivElement>();

  public componentDidMount(): void {
    this.setState(() => ({
      phoneHook: this.phoneHookRef.current,
    }));
  }

  public render(): JSX.Element {
    const { classes, onSort, orderBy, order, txs, onChangeRows, onNextPage, onPrevPage } = this.props;

    return (
      <Block className={classes.outer}>
        <Block maxWidth={200} grow />
        <Block className={classes.inner}>
          <Block margin="lg" />
          <Block className={classes.panel}>
            <TxTableHeaderDesktop onSort={onSort} orderBy={orderBy} order={order} />
            <Block className={classes.column}>
              {txs.map((tx: ProcessedTx) => (
                <TxTableRowDesktop key={tx.id} tx={tx} />
              ))}
              <div ref={this.phoneHookRef} />
              <TxTableFooter
                phoneHook={this.state.phoneHook}
                onChangeRows={onChangeRows}
                onNextPage={onNextPage}
                onPrevPage={onPrevPage}
              />
            </Block>
          </Block>
          <Block margin="lg" />
        </Block>
        <Block maxWidth={200} grow />
      </Block>
    );
  }
}
//&#183;
export default withStyles(styles)(TxTableDesktopInternal);
