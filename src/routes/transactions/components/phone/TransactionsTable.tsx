import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import { background, md } from "~/theme/variables";
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
  header: {
    display: "flex",
    alignItems: "center",
    margin: `${md} 0`,
  },
});

interface Props extends WithStyles<typeof styles> {}

interface State {
  readonly rowsPerPage: number;
}

class TransactionsTable extends React.Component<Props, State> {
  public readonly state = {
    rowsPerPage: 5,
  };

  public readonly rowsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      rowsPerPage: Number(event.target.value),
    });
  };

  public render(): JSX.Element {
    const { classes } = this.props;

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

            <TransactionTableFooter phone rowsChange={this.rowsChange} rowsPerPage={this.state.rowsPerPage} />
          </Block>
        </Block>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(TransactionsTable);
