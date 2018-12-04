import { Amount, BcpAccount, BcpCoin, TokenTicker } from "@iov/bcp-types";
import { ChainId } from "@iov/core";
import { get } from "lodash";
import queryString from "query-string";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";

import uniquId from "uniqid";

import { ConfirmTransactionForm } from "../components/templates/forms";
import { PageStructure } from "../components/templates/page";

import { stringToCoin } from "../logic/balances";
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

const convertStringToAmount = (tokenAmount: string, sigFigs: number, tokenTicker: TokenTicker): Amount => {
  const { whole, fractional } = stringToCoin(tokenAmount, sigFigs);
  return { whole, fractional, tokenTicker };
};

class ConfirmAndSendForm extends React.Component<SendTokenProps & SendTokenDispatchToProps, {}> {
  public readonly onSend = async (): Promise<void> => {
    const { chainIds, sendTransaction, history } = this.props;
    const { iovAddress, tokenAmount } = this.props.match.params;
    const query = queryString.parse(this.props.location.search);
    const memo = query.memo as string;
    const account = this.getFirstAccount();
    if (!account) {
      throw new Error("Cannot send without account");
    }
    const balance = this.getFirstBalance(account);
    if (!balance) {
      throw new Error("Cannot send without balance");
    }

    const amount = convertStringToAmount(tokenAmount, 9, balance.tokenTicker);
    const transactionId = uniquId();
    sendTransaction(chainIds[0], iovAddress, amount, memo, transactionId);
    history.push("/balance");
  };

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
    const balance = this.getFirstBalance(account);
    if (!balance) {
      return false;
    }
    const { iovAddress, tokenAmount, token } = this.props.match.params;
    const query = queryString.parse(this.props.location.search);
    const memo = query.memo || "";
    return (
      <PageStructure activeNavigation="Payments">
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
      </PageStructure>
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
