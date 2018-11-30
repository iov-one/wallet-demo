import { Amount, BcpAccount, TokenTicker } from "@iov/bcp-types";
import { ChainId } from "@iov/core";
import { get } from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";

import queryString from "query-string";

import { SendTokenForm, SendTokenFormState } from "../components/templates/forms";
import { PageStructure } from "../components/templates/page";

import { ChainAccount, getChainIds, getMyAccounts } from "../selectors";
import { sendTransactionSequence } from "../sequences";

interface SendTokenProps extends RouteComponentProps<{ readonly iovAddress: string }> {
  readonly accounts: ReadonlyArray<ChainAccount>;
  readonly chainIds: ReadonlyArray<ChainId>;
}

interface SendTokenDispatchToProps {
  readonly sendTransaction: (
    chainId: ChainId,
    iovAddress: string,
    amount: Amount,
    memo: string,
  ) => Promise<any>;
}

class SendPayment extends React.Component<SendTokenProps & SendTokenDispatchToProps> {
  public readonly onSend = (transInfo: SendTokenFormState): any => {
    const { history } = this.props;
    const { iovAddress } = this.props.match.params;
    const { tokenAmount, memo, token } = transInfo;
    const memoString = memo === "" ? "" : `/?memo=${memo}`;
    history.push(`/confirm-transaction/${iovAddress}/${token}/${tokenAmount}${memoString}`);
  };

  public getFirstAccount(): BcpAccount | undefined {
    return get(this.props.accounts, "[0].account", undefined);
  }

  public render(): JSX.Element | boolean {
    // TODO: we should really iterate over all accounts... this is a work-around for demo
    const account = this.getFirstAccount();
    if (!account) {
      return false;
    }
    const name = `${account.name}*iov`;
    const balances = account.balance;
    if (balances.length === 0) {
      return false;
    }
    const { iovAddress } = this.props.match.params;
    const query = queryString.parse(this.props.location.search);
    const token = (query.token as string) || "IOV";
    return (
      <PageStructure activeNavigation="Payments">
        <SendTokenForm
          name={name}
          defaultToken={token as TokenTicker}
          iovAddress={iovAddress}
          balances={balances}
          onBack={this.props.history.goBack}
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
  sendTransaction: (chainId: ChainId, iovAddress: string, amount: Amount, memo: string) =>
    dispatch(sendTransactionSequence(chainId, iovAddress, amount, memo)),
});

export const SendPaymentPage = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SendPayment),
);
