import FileSaver from "file-saver";
import * as React from "react";
import { connect } from "react-redux";
import { Item } from "~/components/forms/SelectField";
import PageMenu from "~/components/pages/PageMenu";
import { MatchMediaContext } from "~/context/MatchMediaContext";
import { ProcessedTx } from "~/store/notifications/state";
import { ColumnName, SortingState, SortItem, SortOrder } from "../common";
import { Layout } from "../components";
import selector, { SelectorProps } from "./selector";

interface State {
  readonly rowsPerPage: number;
  readonly pageNumber: number;
  readonly sortingColumn: ColumnName;
  readonly sortingOrder: SortOrder;
  readonly sortingState: SortingState;
}

class Transactions extends React.Component<SelectorProps, State> {
  public readonly state = {
    rowsPerPage: 5,
    pageNumber: 0,
    sortingColumn: ColumnName.NoColumn,
    sortingOrder: 0,
    sortingState: {},
  };

  public readonly onChangeRows = (item: Item) => {
    this.setState({
      rowsPerPage: Number(item.name),
    });
  };

  public readonly onSort = (column: ColumnName) => () => {
    let sortingOrder = this.state.sortingOrder;

    if (column !== this.state.sortingColumn) {
      sortingOrder = SortOrder.Ascending;
    } else if (sortingOrder === 1) {
      sortingOrder = SortOrder.Descending;
    } else {
      sortingOrder++;
    }

    this.onSetSortOrder({
      name: "Sort item",
      column,
      order: sortingOrder,
    });
  };

  public readonly onSetSortOrder = (sorting: SortItem): void => {
    const sortingState: SortingState = { [sorting.column]: sorting.order };

    this.setState({
      sortingColumn: sorting.column,
      sortingOrder: sorting.order,
      sortingState,
    });
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
    const blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, "hello world.txt");
  }

  public render(): JSX.Element {
    const { txs } = this.props;

    const { rowsPerPage, pageNumber, sortingColumn, sortingOrder, sortingState } = this.state;

    // tslint:disable-next-line:readonly-array
    const sortedTx = (txs as ProcessedTx[]).sort((a: ProcessedTx | undefined, b: ProcessedTx | undefined) => {
      if (!a || !b) {
        return 0;
      }
      if (sortingColumn === ColumnName.Amount) {
        return a.amount.tokenTicker.localeCompare(b.amount.tokenTicker) * sortingOrder;
      } else if (sortingColumn === ColumnName.Date) {
        const compareResult = a.time < b.time ? -1 : a.time > b.time ? 1 : 0;
        return compareResult * sortingOrder;
      }
      return 0;
    });

    const pageStartIdx = pageNumber * rowsPerPage;
    const pageEndIdx = Math.min(txs.length - 1, pageStartIdx + rowsPerPage);
    const txsToRender = sortedTx.slice(pageStartIdx, pageEndIdx);

    return (
      <MatchMediaContext.Consumer>
        {phone => {
          return (
            <PageMenu phoneFullWidth padding={false}>
              <Layout
                phone={phone}
                txs={txsToRender}
                onChangeRows={this.onChangeRows}
                onPrevPage={this.onPrevPage}
                onNextPage={this.onNextPage}
                onSort={this.onSort}
                sortingState={sortingState}
                onSetSortOrder={this.onSetSortOrder}
                onDownloadCSV={this.onDownloadCSV}
              />
            </PageMenu>
          );
        }}
      </MatchMediaContext.Consumer>
    );
  }
}

export default connect(selector)(Transactions);
