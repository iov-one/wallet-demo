// tslint:disable:no-empty
// TODO: remove above comment when the empty onClick is gone
import { Address, FungibleToken, TokenTicker } from "@iov/bcp-types";
import { ChainId } from "@iov/core";
import { get } from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router";

import { PageStructure } from "../components/compoundComponents/page";
import { SendTokenForm, SendTokenFormState } from "../components/templates/forms";

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

const convertStringToFungibleToken = (tokenAmount: string): FungibleToken => {
  const parts = tokenAmount.split(".");
  const result: FungibleToken = {
    whole: parseInt(parts[0]),
    fractional: parseInt(parts[1]),
    tokenTicker: "IOV" as TokenTicker,
  };
  return result;
};

class SendToken extends React.Component<SendTokenProps & SendTokenDispatchToProps, any> {
  public onSend = (transInfo: SendTokenFormState): any => {
    const { chainIds, sendTransaction, history } = this.props;
    const { iovAddress, tokenAmount, memo } = transInfo;
    const amount = convertStringToFungibleToken(tokenAmount);
    sendTransaction(chainIds[0], iovAddress, amount, memo).then(() => {
      history.goBack();
    });
  };
  public render(): JSX.Element | boolean {
    const { accounts } = this.props;
    const account = get(accounts, "[0].account", false);
    if (!account) {
      return false;
    }
    const name = `${account.name}*iov.value`;
    const balance = account.balance;
    return (
      <PageStructure whiteBg>
        <SendTokenForm name={name} balance={balance[0]} onSend={this.onSend} />
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
