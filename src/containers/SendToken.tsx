// tslint:disable:no-empty
// TODO: remove above comment when the empty onClick is gone
import { BcpAccount, BcpCoin, FungibleToken, TokenTicker } from "@iov/bcp-types";
import { ChainId } from "@iov/core";
import { get } from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";

import { PageStructure } from "../components/compoundComponents/page";
import { SendTokenForm, SendTokenFormState } from "../components/templates/forms";

import { stringToCoin } from "../logic/balances";
import { ChainAccount, getChainIds, getMyAccounts } from "../selectors";
import { sendTransactionSequence } from "../sequences";

interface SendTokenProps extends RouteComponentProps<{}> {
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
}

const convertStringToFungibleToken = (
  tokenAmount: string,
  sigFigs: number,
  tokenTicker: TokenTicker,
): FungibleToken => {
  const { whole, fractional } = stringToCoin(tokenAmount, sigFigs);
  return { whole, fractional, tokenTicker };
};

class SendToken extends React.Component<SendTokenProps & SendTokenDispatchToProps, SendTokenState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  public async onSend(transInfo: SendTokenFormState): Promise<void> {
    const { chainIds, sendTransaction, history } = this.props;
    const { iovAddress, tokenAmount, memo } = transInfo;
    const account = this.getFirstAccount();
    if (!account) {
      throw new Error("Cannot send without account");
    }
    const balance = this.getFirstBalance(account);
    if (!balance) {
      throw new Error("Cannot send without balance");
    }

    try {
      // TODO: seems that iov tokens say 6 sigfigs, but internally use 9... hmmm...
      const amount = convertStringToFungibleToken(tokenAmount, 9, balance.tokenTicker);
      // const amount = convertStringToFungibleToken(tokenAmount, balance.sigFigs, balance.tokenTicker);
      await sendTransaction(chainIds[0], iovAddress, amount, memo);
      history.push("/balance");
    } catch (err) {
      this.setState({
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
    const name = `${account.name}*iov`;
    const balance = this.getFirstBalance(account);
    if (!balance) {
      return false;
    }
    const { error } = this.state;
    // tslint:disable-next-line:no-this-assignment
    const that = this;
    return (
      <PageStructure whiteBg>
        <SendTokenForm name={name} balance={balance} error={error} onSend={info => that.onSend(info)} />
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

export const SendTokenPage = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SendToken),
);
