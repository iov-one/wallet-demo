import { get } from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";

import { BcpCoin, BcpConnection } from "@iov/bcp-types";
import { PublicIdentity } from "@iov/keycontrol";

import { PageStructure } from "../components/compoundComponents/page";
import { BalanceForm } from "../components/templates/forms";
import { ReceiveModal } from "../components/templates/modal";

import { BcpAccountWithChain } from "../reducers/blockchain";
import { ChainAccount, getMyAccounts } from "../selectors";

interface BalanceProps extends RouteComponentProps<{}> {
  readonly accounts: ReadonlyArray<ChainAccount>;
  readonly connections: { readonly [chainId: string]: BcpConnection };
  readonly identity: any;
}

interface BalanceDispatchProps {
  readonly getAccount: (
    conn: BcpConnection,
    identity: PublicIdentity,
  ) => Promise<BcpAccountWithChain | undefined>;
}

interface BalanceState {
  readonly showReceiveModal: boolean;
}

class Balance extends React.Component<BalanceProps & BalanceDispatchProps, BalanceState> {
  public readonly state = {
    showReceiveModal: false,
  };

  public componentDidMount(): void {
    const { accounts, history } = this.props;
    if (accounts.length === 0) {
      history.push("/");
    }
  }

  public render(): JSX.Element | boolean {
    const { accounts, history } = this.props;
    const { showReceiveModal } = this.state;
    const account = get(accounts, "[0].account", false);
    if (!account) {
      return false;
    }
    const name = `${account.name}*iov.value`;
    const address = account.address;
    const balances = account.balance.map((balance: BcpCoin) => {
      const { whole, fractional, tokenTicker, tokenName } = balance;
      return {
        whole,
        fractional,
        sigFigs: 9,
        tokenTicker,
        tokenName,
      };
    });
    return (
      <PageStructure>
        <div>
          <BalanceForm
            accountName={name}
            balances={balances}
            onSend={() => {
              history.push("/send-token/");
            }}
            onReceive={() => {
              this.setState({
                showReceiveModal: true,
              });
            }}
            onBackup={() => {
              console.log("on Backup");
            }}
          />
          <ReceiveModal
            name={name}
            address={address}
            onRequestClose={() => {
              this.setState({
                showReceiveModal: false,
              });
            }}
            visible={showReceiveModal}
          />
        </div>
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
