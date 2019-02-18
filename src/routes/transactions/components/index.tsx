import * as React from "react";
import Form from "~/components/forms/Form";
import Hairline from "~/components/layout/Hairline";
import { TransactionTableProps } from "../common";
import DesktopTransactionsTable from "./desktop/TransactionsTable";
import PhoneTransactionsTable from "./phone/TransactionsTable";
import ToolBox from "./ToolBox";

interface Props extends TransactionTableProps {
  readonly phone: boolean;
}

// tslint:disable-next-line:no-empty
const onSubmit = (_: object) => {};
export const Layout = ({ phone, onChangeRows }: Props) => (
  <React.Fragment>
    <Hairline />
    <ToolBox phone={phone} />
    <Hairline />
    <Form onSubmit={onSubmit}>
      {() =>
        phone ? (
          <PhoneTransactionsTable onChangeRows={onChangeRows} />
        ) : (
          <DesktopTransactionsTable onChangeRows={onChangeRows} />
        )
      }
    </Form>
  </React.Fragment>
);
