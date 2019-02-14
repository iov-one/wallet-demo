import * as React from "react";
import Hairline from "~/components/layout/Hairline";
import DesktopTransactionsTable from "./desktop/TransactionsTable";
import PhoneTransactionsTable from "./phone/TransactionsTable";
import ToolBox from "./ToolBox";

interface Props {
  readonly phone: boolean;
}

export default ({ phone }: Props): JSX.Element => {
  return (
    <React.Fragment>
      <Hairline />
      <ToolBox phone={phone} />
      <Hairline />
      {phone ? 
        <PhoneTransactionsTable />
        :
        <DesktopTransactionsTable />
      }
    </React.Fragment>
  );
};
