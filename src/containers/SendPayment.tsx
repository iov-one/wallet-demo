// tslint:disable:no-empty
// TODO: remove above comment when the empty onClick is gone
import { BcpAccount, BcpCoin, FungibleToken } from "@iov/bcp-types";
import { ChainId } from "@iov/core";
import { get } from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";

import { PageStructure } from "../components/compoundComponents/page";
import { SendTokenForm, SendTokenFormState } from "../components/templates/forms";

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
    amount: FungibleToken,
    memo: string,
  ) => Promise<any>;
}

interface SendTokenState {
  readonly error?: string;
  readonly loading: boolean;
}

class SendPayment extends React.Component<SendTokenProps & SendTokenDispatchToProps, SendTokenState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  public onSend(transInfo: SendTokenFormState): any {
    const { history } = this.props;
    const { iovAddress, tokenAmount, memo } = transInfo;
    const memoString = memo === "" ? "" : `/?memo=${memo}`;
    history.push(`/confirm-transaction/${iovAddress}/${tokenAmount}${memoString}`);
  }

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
    const name = `${account.name}*iov`;
    const balance = this.getFirstBalance(account);
    if (!balance) {
      return false;
    }
    const { error, loading } = this.state;
    // tslint:disable-next-line:no-this-assignment
    const that = this;
    return (
      <PageStructure whiteBg>
        <SendTokenForm
          name={name}
          balance={balance}
          error={error}
          loading={loading}
          onBack={() => {
            history.back();
          }}
          onSend={info => that.onSend(info)}
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
  sendTransaction: (chainId: ChainId, iovAddress: string, amount: FungibleToken, memo: string) =>
    dispatch(sendTransactionSequence(chainId, iovAddress, amount, memo)),
});

export const SendPaymentPage = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SendPayment),
);
