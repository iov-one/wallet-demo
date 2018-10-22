import { get } from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";

import { PageStructure } from "../components/compoundComponents/page";
import { AccountInfoSection } from "../components/templates/sections";

import { ChainAccount, getMyAccounts } from "../selectors";

interface BalanceProps extends RouteComponentProps<{}> {
  readonly accounts: ReadonlyArray<ChainAccount>;
}

class Balance extends React.Component<BalanceProps, any> {
  public componentDidMount(): void {
    const { accounts, history } = this.props;
    if (accounts.length === 0) {
      history.push("/");
    }
  }
  public render(): JSX.Element | boolean {
    const { accounts } = this.props;
    const account = get(accounts, "[0].account", false);
    if (!account) {
      return false;
    }
    const name = account ? `${account.name}*iov.value` : "";
    const balance = account ? account.balance : [];
    return (
      <PageStructure>
        <AccountInfoSection name={name} balances={balance} />
      </PageStructure>
    );
  }
}

// Updated with types like in Home.tsc
const mapStateToProps = (state: any, ownProps: BalanceProps): BalanceProps => ({
  ...ownProps,
  accounts: getMyAccounts(state),
});

export const BalancePage = withRouter(connect(mapStateToProps)(Balance));
