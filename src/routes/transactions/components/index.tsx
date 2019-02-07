import * as React from "react";
import Hairline from "~/components/layout/Hairline";
import NoTransactions from "./NoTransactions";
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
      <NoTransactions />
    </React.Fragment>
  );
};
