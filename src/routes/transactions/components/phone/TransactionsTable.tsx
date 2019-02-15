import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import { background } from "~/theme/variables";
import { TransactionsTableState, TransactionTableProps } from "../index";
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

class TransactionsTable extends React.Component<Props, TransactionsTableState> {
  public readonly state = {
    rowsPerPage: 5,
    phoneHook: null,
  };

  private readonly phoneHookRef = React.createRef<HTMLDivElement>();

  public componentDidMount(): void {
    this.setState(() => ({
      phoneHook: this.phoneHookRef.current,
    }));
  }

  // tslint:disable-next-line:no-empty
  public readonly onSubmit = async (_: object) => {};

  public render(): JSX.Element {
    const { classes, onChangeRows } = this.props;

    return (
      <React.Fragment>
        <Block margin="lg" />
        <Block className={classes.panel}>
          <TransactionsTableHeader />
          <Block className={classes.column}>
            <TransactionRow
              type="send"
              address="alex*iov"
              amount="-0.01762507"
              symbol="BTC"
              time={new Date(Date.now())}
            />
            <TransactionRow
              type="receive"
              address="cathy*iov"
              amount="+507"
              symbol="IOV"
              time={new Date(Date.now())}
            />
            <TransactionRow
              type="reject"
              address="alex*iov"
              amount="-0.01762507"
              symbol="BTC"
              time={new Date(Date.now())}
            />
            <TransactionRow
              type="receive"
              address="blockchain address"
              amount="+0.1757"
              symbol="ETH"
              time={new Date(Date.now())}
            />
            <div ref={this.phoneHookRef} />
            <TransactionTableFooter phone phoneHook={this.state.phoneHook} onChangeRows={onChangeRows} />
          </Block>
        </Block>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(TransactionsTable);
