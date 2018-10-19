// tslint:disable:no-empty
// TODO: remove above comment when the empty onClick is gone
import { get } from "lodash";
import * as React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import { PageStructure } from "../components/compoundComponents/page";
import { AccountInfoSection } from "../components/templates/sections";

import { ChainAccount, getMyAccounts } from "../selectors";

interface BalanceProps {
  accounts: ReadonlyArray<ChainAccount>;
  history: any;
}

class Balance extends React.Component<BalanceProps, any> {
  public componentDidMount() {
    const { accounts, history } = this.props;
    if (accounts.length === 0) {
      history.push("/");
    }
  }
  public render(): JSX.Element | boolean {
    const { accounts } = this.props;
    const account = get(accounts, "[0].account", false);
    if (!account) return false;
    const name = account ? `${account.name}*iov.value` : "";
    const balance = account ? account.balance : [];
    return (
      <PageStructure>
        <AccountInfoSection name={name} balances={balance} />
      </PageStructure>
    );
  }
}

const mapStateToProps = (state: any): any => ({
  accounts: getMyAccounts(state),
});

export const BalancePage = withRouter(connect(mapStateToProps)(Balance));
