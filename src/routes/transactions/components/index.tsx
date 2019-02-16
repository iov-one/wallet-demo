import * as React from "react";
import Form from "~/components/forms/Form";
import Hairline from "~/components/layout/Hairline";
import PageMenu from "~/components/pages/PageMenu";
import { MatchMediaContext } from "~/context/MatchMediaContext";
import { TransactionTableProps } from "../common";
import DesktopTransactionsTable from "./desktop/TransactionsTable";
import PhoneTransactionsTable from "./phone/TransactionsTable";
import ToolBox from "./ToolBox";

// tslint:disable-next-line:no-empty
const onSubmit = (_: object) => {};

export const Layout = ({ onChangeRows, txs }: TransactionTableProps) => (
  <MatchMediaContext.Consumer>
    {phone => {
      return (
        <PageMenu phoneFullWidth padding={false}>
          <Hairline />
          <ToolBox phone={phone} />
          <Hairline />
          <Form onSubmit={onSubmit}>
            {() =>
              phone ? (
                <PhoneTransactionsTable txs={txs} onChangeRows={onChangeRows} />
              ) : (
                <DesktopTransactionsTable txs={txs} onChangeRows={onChangeRows} />
              )
            }
          </Form>
        </PageMenu>
      );
    }}
  </MatchMediaContext.Consumer>
);
