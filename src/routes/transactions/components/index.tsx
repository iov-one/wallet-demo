import * as React from "react";
import Form from "~/components/forms/Form";
import Hairline from "~/components/layout/Hairline";
import DesktopTransactionsTable from "./desktop/TransactionsTable";
import { DesktopHeaderProps } from "./desktop/TransactionsTableHeader";
import { SortMenuProps } from "./phone/SortMenu";
import PhoneTransactionsTable from "./phone/TransactionsTable";
import { TransactionTableProps } from "./rowTransactionsBuilder";
import ToolBox, { ToolBoxProps } from "./ToolBox";

interface Props extends SortMenuProps, DesktopHeaderProps, ToolBoxProps, TransactionTableProps {
  readonly phone: boolean;
}

// tslint:disable-next-line:no-empty
const onSubmit = (_: object) => {};

export const Layout = ({ onDownloadCSV, onSort, onSetSortOrder, txs, phone, ...restProps }: Props) => (
  <React.Fragment>
    <Hairline />
    <ToolBox phone={phone} onDownloadCSV={onDownloadCSV} />
    <Hairline />
    <Form onSubmit={onSubmit}>
      {() =>
        phone ? (
          <PhoneTransactionsTable txs={txs} onSetSortOrder={onSetSortOrder} {...restProps} />
        ) : (
          <DesktopTransactionsTable txs={txs} onSort={onSort} {...restProps} />
        )
      }
    </Form>
  </React.Fragment>
);
