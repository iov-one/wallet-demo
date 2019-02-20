import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import { ProcessedTx } from "~/store/notifications/state";
import { background } from "~/theme/variables";
import NoTransactions from "../NoTransactions";
import { TxTableProps, TxTableState } from "./rowTxBuilder";
import TxTableFooter from "./TxTableFooter";
import TxTableHeaderPhone from "./TxTableHeader/TxTableHeaderPhone";
import TxTableRowPhone from "./TxTableRow/TxTableRowPhone";

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

interface Props extends TxTableProps, WithStyles<typeof styles> {}

interface State extends TxTableState {
  readonly phoneSortHook: HTMLDivElement | null;
}

export class TxTablePhoneInternal extends React.Component<Props, State> {
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
    const { classes, txs, onSort, orderBy, order, onChangeRows, onNextPage, onPrevPage } = this.props;

    return (
      <React.Fragment>
        <Block margin="lg" />
        <Block className={classes.panel}>
          <TxTableHeaderPhone
            phoneHook={this.state.phoneSortHook}
            onSort={onSort}
            orderBy={orderBy}
            order={order}
          />
          <Block className={classes.column}>
            <div ref={this.phoneSortHookRef} />
            {txs.length > 0 ? (
              txs.map((tx: ProcessedTx) => <TxTableRowPhone key={tx.id} tx={tx} />)
            ) : (
              <NoTransactions />
            )}
            <div ref={this.phoneHookRef} />
            <TxTableFooter
              phone
              phoneHook={this.state.phoneHook}
              onChangeRows={onChangeRows}
              onNextPage={onNextPage}
              onPrevPage={onPrevPage}
            />
          </Block>
        </Block>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(TxTablePhoneInternal);
