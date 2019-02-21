import FileSaver from "file-saver";
import * as React from "react";
import { connect } from "react-redux";
import { Item } from "~/components/forms/SelectField";
import PageMenu from "~/components/pages/PageMenu";
import { MatchMediaContext } from "~/context/MatchMediaContext";
import { ProcessedTx } from "~/store/notifications/state";
import { Layout } from "../components";
import { filterTxsBy, ORDER_DESC, SortOrder, TX_DATE_COLUMN, TxsOrder } from "../components/sorting";
import selector, { SelectorProps } from "./selector";

interface State {
  readonly rowsPerPage: number;
  readonly pageNumber: number;
  readonly orderBy: TxsOrder;
  readonly order: SortOrder;
}

class Transactions extends React.Component<SelectorProps, State> {
  public readonly state = {
    rowsPerPage: 5,
    pageNumber: 0,
    orderBy: TX_DATE_COLUMN as TxsOrder,
    order: ORDER_DESC as SortOrder,
  };

  public readonly onChangeRows = (item: Item) => {
    this.setState({
      rowsPerPage: Number(item.name),
    });
  };

  public readonly onSort = (orderBy: TxsOrder, order: SortOrder) => () => {
    if (orderBy === this.state.orderBy && order === this.state.order) {
      return;
    }

    this.setState(() => ({
      orderBy,
      order,
    }));
  };

  public readonly onPrevPage = () => {
    if (!this.state.pageNumber) {
      return;
    }

    this.setState({
      pageNumber: this.state.pageNumber - 1,
    });
  };

  public readonly onNextPage = () => {
    const totalPages = Math.ceil(this.props.txs.length / this.state.rowsPerPage);
    if (this.state.pageNumber === totalPages - 1) {
      return;
    }

    this.setState({
      pageNumber: this.state.pageNumber + 1,
    });
  };

  public readonly onDownloadCSV = () => {
    const csvHeader =
      '"ID";"Recipient";"Signer";"Quantity";"Fractional Digits";"Token Ticker";"Time";"Received";"Success";"Error";"Note"';
    const csvBody = this.props.txs.map((tx: ProcessedTx) => {
      const parties = `"${tx.id}";"${tx.recipient}";"${tx.signer}";`;
      const payment = `"${tx.amount.quantity}";"${tx.amount.fractionalDigits}";"${tx.amount.tokenTicker}";`;
      const date = `"${tx.time.toISOString()}";`;
      const status = `"${tx.received}";"${tx.success}";"${tx.err}";"${tx.memo}"`;

      const txRow = `${parties}${payment}${date}${status}`;

      return txRow;
    });

    const blob = new Blob([`${csvHeader}\n${csvBody.join("\n")}`], { type: "text/plain;charset=utf-8" });
    FileSaver.saveAs(blob, "transactions.csv");
  };

  public render(): JSX.Element {
    const { rowsPerPage, pageNumber, orderBy, order } = this.state;
    const { txs, connection } = this.props;
    const orderedTxs = filterTxsBy(txs, rowsPerPage, pageNumber, orderBy, order);

    return (
      <MatchMediaContext.Consumer>
        {phone => {
          return (
            <PageMenu phoneFullWidth padding={false}>
              <Layout
                phone={phone}
                txs={orderedTxs}
                onChangeRows={this.onChangeRows}
                onPrevPage={this.onPrevPage}
                onNextPage={this.onNextPage}
                onSort={this.onSort}
                onDownloadCSV={this.onDownloadCSV}
                orderBy={orderBy}
                order={order}
                connection={connection}
              />
            </PageMenu>
          );
        }}
      </MatchMediaContext.Consumer>
    );
  }
}

export default connect(selector)(Transactions);
