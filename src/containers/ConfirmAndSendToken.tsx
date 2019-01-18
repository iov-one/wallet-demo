import { Amount, BcpAccount, BcpCoin } from "@iov/bcp-types";
import { ChainId } from "@iov/core";
import { get } from "lodash";
import queryString from "query-string";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import styled from "styled-components";
import uniquId from "uniqid";
import PageMenu from "~/components/pages/PageMenu";
import { ConfirmTransactionForm } from "../components/templates/forms";
import { padAmount, stringToAmount } from "../logic/balances";
import { ChainAccount, getChainIds, getMyAccounts } from "../selectors";
import { sendTransactionSequence } from "../sequences";

interface SendTokenProps
  extends RouteComponentProps<{
    readonly iovAddress: string;
    readonly token: string;
    readonly tokenAmount: string;
  }> {
  readonly accounts: ReadonlyArray<ChainAccount>;
  readonly chainIds: ReadonlyArray<ChainId>;
}

interface SendTokenDispatchToProps {
  readonly sendTransaction: (
    chainId: ChainId,
    iovAddress: string,
    amount: Amount,
    memo: string,
    id: string,
  ) => Promise<any>;
}

const Layout = styled.div`
  display: flex;
  justify-content: center;
`;

class ConfirmAndSendForm extends React.Component<SendTokenProps & SendTokenDispatchToProps, {}> {
  public readonly onSend = async (): Promise<void> => {
    const { chainIds, sendTransaction, history } = this.props;
    const { iovAddress, tokenAmount } = this.props.match.params;
    const query = queryString.parse(this.props.location.search);
    const memo = query.memo as string;
    // TODO: we need to select account based on chainId, which depends on the tokens
    // time to update and re-org selectors
    const account = this.getFirstAccount();
    if (!account) {
      throw new Error("Cannot send without account");
    }
    const balance = this.getFirstBalance(account);
    if (!balance) {
      throw new Error("Cannot send without balance");
    }

    const amount = stringToAmount(tokenAmount, balance.tokenTicker);
    // currently (up to 0.11), iov-core requires specific number of places on the send transaction amount, so we extend it
    const paddedAmount = padAmount(amount, 9);
    const transactionId = uniquId();
    // TODO: we need to pass the chainId here... it depends on the selected token
    sendTransaction(chainIds[0], iovAddress, paddedAmount, memo, transactionId);
    history.push("/balance");
  };

  // TODO: both of these should go away, we need to dynamically select
  public getFirstAccount(): BcpAccount | undefined {
    return get(this.props.accounts, "[0].account", undefined);
  }
  public getFirstBalance(account: BcpAccount): BcpCoin | undefined {
    return account.balance[0];
  }

  public render(): JSX.Element | boolean {
    // TODO: we should really iterate over all accounts... this is a work-around for demo
    const account = this.getFirstAccount();
    if (!account) {
      return false;
    }
    // TODO: generic "get all balances" selector from Balances route
    const balance = this.getFirstBalance(account);
    if (!balance) {
      return false;
    }

    const { iovAddress, tokenAmount, token } = this.props.match.params;
    const query = queryString.parse(this.props.location.search);
    const memo = query.memo || "";
    return (
      <PageMenu phoneFullWidth>
        <Layout>
          <ConfirmTransactionForm
            iovAddress={iovAddress}
            tokenAmount={tokenAmount}
            token={token}
            memo={memo as string}
            onBack={() => {
              history.back();
            }}
            onSend={this.onSend}
          />
        </Layout>
      </PageMenu>
    );
  }
}

const mapStateToProps = (state: any, ownProps: SendTokenProps): SendTokenProps => ({
  ...ownProps,
  accounts: getMyAccounts(state),
  chainIds: getChainIds(state),
});

const mapDispatchToProps = (dispatch: any): SendTokenDispatchToProps => ({
  sendTransaction: (chainId: ChainId, iovAddress: string, amount: Amount, memo: string, id: string) =>
    dispatch(sendTransactionSequence(chainId, iovAddress, amount, memo, id)),
});

export const ConfirmTransactionPage = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ConfirmAndSendForm),
);
