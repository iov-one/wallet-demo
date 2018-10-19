// tslint:disable:no-empty
// TODO: remove above comment when the empty onClick is gone
import * as React from "react";
import { withRouter } from "react-router";

import { PageStructure } from "../components/compoundComponents/page";
import { AccountInfoSection } from "../components/templates/sections";

class Balance extends React.Component<any, any> {
  public render(): JSX.Element {
    const balances: ReadonlyArray<any> = [
      { amount: "10,00", tokenUnit: "IOV", info: "IOV is the native token of the IOV blockchain" },
      { amount: "0,00", tokenUnit: "LSK", info: "LSK is the native token of the Lisk blockchain" },
    ];
    return (
      <PageStructure>
        <AccountInfoSection name="victor*iov.value" balances={balances} />
      </PageStructure>
    );
  }
}

export const BalancePage = withRouter(Balance);
