import * as React from "react";
import Hairline from "~/components/layout/Hairline";
import ToolBox from "./ToolBox";
import TransactionsTable from "./TransactionsTable";

interface Props {
  readonly phone: boolean;
}

export default ({ phone }: Props): JSX.Element => {
  return (
    <React.Fragment>
      <Hairline />
      <ToolBox phone={phone} />
      <Hairline />
      <TransactionsTable />
    </React.Fragment>
  );
};
