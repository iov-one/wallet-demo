import * as React from "react";
import Form from "~/components/forms/Form";
import Hairline from "~/components/layout/Hairline";
import DesktopTransactionsTable from "./desktop/TransactionsTable";
import PhoneTransactionsTable from "./phone/TransactionsTable";
import { TransactionTableProps } from "./rowTransactionsBuilder";
import ToolBox, { ToolBoxProps } from "./ToolBox";

interface Props extends ToolBoxProps, TransactionTableProps {
  readonly phone: boolean;
}

// tslint:disable-next-line:no-empty
const onSubmit = (_: object) => {};

export const Layout = ({ onDownloadCSV, phone, ...restProps }: Props) => (
  <React.Fragment>
    <Hairline />
    <ToolBox phone={phone} onDownloadCSV={onDownloadCSV} />
    <Hairline />
    <Form onSubmit={onSubmit}>
      {() =>
        phone ? <PhoneTransactionsTable {...restProps} /> : <DesktopTransactionsTable {...restProps} />
      }
    </Form>
  </React.Fragment>
);
