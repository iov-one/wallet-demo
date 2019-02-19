import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import { ProcessedTx } from "~/store/notifications/state";
import { background } from "~/theme/variables";
import NoTransactions from "../NoTransactions";
import { TransactionsTableState, TransactionTableProps } from "../rowTransactionsBuilder";
import TransactionTableFooter from "../TransactionTableFooter";
import TransactionRow from "./TransactionRow";
import TransactionsTableHeader from "./TransactionsTableHeader";

const styles = createStyles({
  panel: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: background,
  },
  column: {
    display: "flex",
    flexDirection: "column",
  },
});

interface Props extends TransactionTableProps, WithStyles<typeof styles> {}

interface State extends TransactionsTableState {
  readonly phoneSortHook: HTMLDivElement | null;
}

class TransactionsTable extends React.Component<Props, State> {
  public readonly state = {
    phoneHook: null,
    phoneSortHook: null,
  };

  private readonly phoneHookRef = React.createRef<HTMLDivElement>();
  private readonly phoneSortHookRef = React.createRef<HTMLDivElement>();

  public componentDidMount(): void {
    this.setState(() => ({
      phoneHook: this.phoneHookRef.current,
      phoneSortHook: this.phoneSortHookRef.current,
    }));
  }

  // tslint:disable-next-line:no-empty
  public readonly onSubmit = async (_: object) => {};

  public render(): JSX.Element {
    const { classes, txs, ...restProps } = this.props;

    return (
      <React.Fragment>
        <Block margin="lg" />
        <Block className={classes.panel}>
          <TransactionsTableHeader phoneHook={this.state.phoneSortHook} {...restProps} />
          <Block className={classes.column}>
            <div ref={this.phoneSortHookRef} />
            {txs.length > 0 ? (
              txs.map((tx: ProcessedTx) => <TransactionRow key={tx.id} tx={tx} />)
            ) : (
              <NoTransactions />
            )}
            <div ref={this.phoneHookRef} />
            <TransactionTableFooter phone phoneHook={this.state.phoneHook} {...restProps} />
          </Block>
        </Block>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(TransactionsTable);
