import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
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
    const { classes, onChangeRows } = this.props;

    return (
      <Block className={classes.outer}>
        <Block maxWidth={200} grow />
        <Block className={classes.inner}>
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
              <TransactionTableFooter phoneHook={this.state.phoneHook} onChangeRows={onChangeRows} />
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