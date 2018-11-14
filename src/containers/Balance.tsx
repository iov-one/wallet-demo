import { get } from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";

import { BcpCoin, BcpConnection } from "@iov/bcp-types";
import { PublicIdentity } from "@iov/keycontrol";

import { PageStructure } from "../components/compoundComponents/page";
import { AddressInputForm, BalanceForm } from "../components/templates/forms";
import { IOVModal, ReceiveModal } from "../components/templates/modal";

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
  readonly showAddressModal: boolean;
}

class Balance extends React.Component<BalanceProps & BalanceDispatchProps, BalanceState> {
  public readonly state = {
    showReceiveModal: false,
    showAddressModal: false,
  };

  public componentDidMount(): void {
    const { accounts, history } = this.props;
    if (accounts.length === 0) {
      history.push("/");
    }
  }

  public readonly onSend = (): void => {
    console.log("Sending ...");
  };

  public render(): JSX.Element | boolean {
    const { accounts } = this.props;
    const { showReceiveModal, showAddressModal } = this.state;
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
              this.setState({
                showAddressModal: true,
              });
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
          <IOVModal
            visible={showAddressModal}
            onRequestClose={() => {
              this.setState({
                showAddressModal: false,
              });
            }}
            suggestionText="Your friends not on IOV yet?"
            buttonText="Invite someone to IOV now"
            onSuggestion={() => {
              console.log("Suggestion");
            }}
          >
            <AddressInputForm onNext={this.onSend} />
          </IOVModal>
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
