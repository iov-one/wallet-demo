import * as React from "react";
import Form from "~/components/forms/Form";
import Hairline from "~/components/layout/Hairline";
import { TransactionTableProps } from "../common";
import DesktopTransactionsTable from "./desktop/TransactionsTable";
import { DesktopHeaderProps } from "./desktop/TransactionsTableHeader";
import { SortMenuProps } from "./phone/SortMenu";
import PhoneTransactionsTable from "./phone/TransactionsTable";
import ToolBox, { ToolBoxProps } from "./ToolBox";

interface Props extends SortMenuProps, DesktopHeaderProps, ToolBoxProps, TransactionTableProps {
  readonly phone: boolean;
}

// tslint:disable-next-line:no-empty
const onSubmit = (_: object) => {};

export const Layout = ({
  onChangeRows,
  onDownloadCSV,
  onPrevPage,
  onNextPage,
  onSort,
  onSetSortOrder,
  sortingState,
  txs,
  phone,
}: Props) => (
  <React.Fragment>
    <Hairline />
    <ToolBox phone={phone} onDownloadCSV={onDownloadCSV} />
    <Hairline />
    <Form onSubmit={onSubmit}>
      {() =>
        phone ? (
          <PhoneTransactionsTable
            txs={txs}
            onChangeRows={onChangeRows}
            onPrevPage={onPrevPage}
            onNextPage={onNextPage}
            onSetSortOrder={onSetSortOrder}
            sortingState={sortingState}
          />
        ) : (
          <DesktopTransactionsTable
            txs={txs}
            onChangeRows={onChangeRows}
            onPrevPage={onPrevPage}
            onNextPage={onNextPage}
            onSort={onSort}
            sortingState={sortingState}
          />
        )
      }
    </Form>
  </React.Fragment>
);
