import { BnsConnection } from "@iov/bns";
import * as React from "react";
import Form from "~/components/forms/Form";
import Hairline from "~/components/layout/Hairline";
import DownloadCSV, { DownloadCSVProps } from "./DownloadCSV";
import { TxTableProps } from "./TxTable/rowTxBuilder";
import TxTableDesktop from "./TxTable/TxTableDesktop";
import TxTablePhone from "./TxTable/TxTablePhone";

interface Props extends DownloadCSVProps, TxTableProps {
  readonly phone: boolean;
  readonly connection: BnsConnection;
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
  connection,
}: Props) => (
  <React.Fragment>
    <Hairline />
    <DownloadCSV phone={phone} onDownloadCSV={onDownloadCSV} />
    <Hairline />
    <Form onSubmit={onSubmit}>
      {() =>
        phone ? (
          <TxTablePhone
            txs={txs}
            onChangeRows={onChangeRows}
            onPrevPage={onPrevPage}
            onNextPage={onNextPage}
            onSort={onSort}
            orderBy={orderBy}
            order={order}
            connection={connection}
          />
        ) : (
          <TxTableDesktop
            txs={txs}
            onChangeRows={onChangeRows}
            onPrevPage={onPrevPage}
            onNextPage={onNextPage}
            onSort={onSort}
            orderBy={orderBy}
            order={order}
            connection={connection}
          />
        )
      }
    </Form>
  </React.Fragment>
);
