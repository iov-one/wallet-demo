// tslint:disable:no-empty
// TODO: remove above comment when the empty onClick is gone
import { BcpAccount, BcpCoin, FungibleToken, TokenTicker } from "@iov/bcp-types";
import { ChainId } from "@iov/core";
import { get } from "lodash";
import queryString from "query-string";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";

import { PageStructure } from "../components/compoundComponents/page";
import { ConfirmTransactionForm } from "../components/templates/forms";

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
    amount: FungibleToken,
    memo: string,
  ) => Promise<any>;
}

interface SendTokenState {
  readonly error?: string;
  readonly loading: boolean;
}

const convertStringToFungibleToken = (
  tokenAmount: string,
  sigFigs: number,
  tokenTicker: TokenTicker,
): FungibleToken => {
  const { whole, fractional } = stringToCoin(tokenAmount, sigFigs);
  return { whole, fractional, tokenTicker };
};

class ConfirmAndSendForm extends React.Component<SendTokenProps & SendTokenDispatchToProps, SendTokenState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  public async onSend(that: any): Promise<void> {
    const { chainIds, sendTransaction, history } = that.props;
    const { iovAddress, tokenAmount } = that.props.match.params;
    const query = queryString.parse(that.props.location.search);
    const memo = query.memo as string;
    const account = that.getFirstAccount();
    if (!account) {
      throw new Error("Cannot send without account");
    }
    const balance = that.getFirstBalance(account);
    if (!balance) {
      throw new Error("Cannot send without balance");
    }

    try {
      that.setState({ loading: true });
      // TODO: seems that iov tokens say 6 sigfigs, but internally use 9... hmmm...
      const amount = convertStringToFungibleToken(tokenAmount, 9, balance.tokenTicker);
      // const amount = convertStringToFungibleToken(tokenAmount, balance.sigFigs, balance.tokenTicker);
      await sendTransaction(chainIds[0], iovAddress, amount, memo);
      that.setState({ loading: false });
      history.push("/balance");
    } catch (err) {
      that.setState({
        loading: false,
        error: `${err}`,
      });
      console.log(err);
    }
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
    const balance = this.getFirstBalance(account);
    if (!balance) {
      return false;
    }
    const { error, loading } = this.state;
    // tslint:disable-next-line:no-this-assignment
    const that = this;
    const { iovAddress, tokenAmount, token } = this.props.match.params;
    const query = queryString.parse(this.props.location.search);
    const memo = query.memo || "";
    return (
      <PageStructure>
        <ConfirmTransactionForm
          iovAddress={iovAddress}
          tokenAmount={tokenAmount}
          token={token}
          memo={memo as string}
          error={error}
          loading={loading}
          onBack={() => {
            history.back();
          }}
          onSend={() => this.onSend(that)}
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

export const ConfirmTransactionPage = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ConfirmAndSendForm),
);
