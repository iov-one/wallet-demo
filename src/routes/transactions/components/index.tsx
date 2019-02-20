import * as React from "react";
import Form from "~/components/forms/Form";
import Hairline from "~/components/layout/Hairline";
import DesktopTransactionsTable from "./desktop/TransactionsTable";
import DownloadCSV, { DownloadCSVProps } from "./DownloadCSV";
import PhoneTransactionsTable from "./phone/TransactionsTable";
import { TransactionTableProps } from "./rowTransactionsBuilder";

interface Props extends DownloadCSVProps, TransactionTableProps {
  readonly phone: boolean;
}

// tslint:disable-next-line:no-empty
const onSubmit = (_: object) => {};

export const Layout = ({
  onDownloadCSV,
  phone,
  txs,
  onChangeRows,
  onPrevPage,
  onNextPage,
  onSort,
  orderBy,
  order,
}: Props) => (
  <React.Fragment>
    <Hairline />
    <DownloadCSV phone={phone} onDownloadCSV={onDownloadCSV} />
    <Hairline />
    <Form onSubmit={onSubmit}>
      {() =>
        phone ? (
          <PhoneTransactionsTable
            txs={txs}
            onChangeRows={onChangeRows}
            onPrevPage={onPrevPage}
            onNextPage={onNextPage}
            onSort={onSort}
            orderBy={orderBy}
            order={order}
          />
        ) : (
          <DesktopTransactionsTable
            txs={txs}
            onChangeRows={onChangeRows}
            onPrevPage={onPrevPage}
            onNextPage={onNextPage}
            onSort={onSort}
            orderBy={orderBy}
            order={order}
          />
        )
      }
    </Form>
  </React.Fragment>
);
