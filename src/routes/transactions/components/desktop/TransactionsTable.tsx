import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import { ProcessedTx } from "~/store/notifications/state";
import { background, shadowColor } from "~/theme/variables";
import { TransactionsTableState, TransactionTableProps } from "../../common";
import TransactionTableFooter from "../TransactionTableFooter";
import TransactionRow from "./TransactionRow";
import TransactionsTableHeader from "./TransactionsTableHeader";

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

interface Props extends TransactionTableProps, WithStyles<typeof styles> {}

class TransactionsTable extends React.Component<Props, TransactionsTableState> {
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
    const { classes, onChangeRows, onPrevPage, onNextPage, onSort, sortingState, txs } = this.props;

    return (
      <Block className={classes.outer}>
        <Block maxWidth={200} grow />
        <Block className={classes.inner}>
          <Block margin="lg" />
          <Block className={classes.panel}>
            <TransactionsTableHeader onSort={onSort} sortingState={sortingState} />
            <Block className={classes.column}>
              {txs.map((tx: ProcessedTx) => (
                <TransactionRow key={tx.id} tx={tx} />
              ))}
              <div ref={this.phoneHookRef} />
              <TransactionTableFooter
                phoneHook={this.state.phoneHook}
                onChangeRows={onChangeRows}
                onPrevPage={onPrevPage}
                onNextPage={onNextPage}
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
export default withStyles(styles)(TransactionsTable);
