// tslint:disable:no-empty
// TODO: remove above comment when the empty onClick is gone
import { Address, FungibleToken, TokenTicker } from "@iov/bcp-types";
import { ChainId, MultiChainSigner } from "@iov/core";
import { get } from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router";

import { PageStructure } from "../components/compoundComponents/page";
import { SendTokenForm, SendTokenFormState } from "../components/templates/forms";

import { ChainAccount, getChainIds, getMyAccounts, getSigner } from "../selectors";

import { sendTransaction } from "../logic/account";

interface SendTokenProps extends RouteComponentProps<{}> {
  readonly accounts: ReadonlyArray<ChainAccount>;
  readonly signer?: MultiChainSigner;
  readonly chainIds: ReadonlyArray<ChainId>;
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

class SendToken extends React.Component<SendTokenProps, any> {
  public onSend = (transInfo: SendTokenFormState): any => {
    const { signer, chainIds } = this.props;
    const { iovAddress, tokenAmount, memo } = transInfo;
    const amount = convertStringToFungibleToken(tokenAmount);
    if (signer) {
      sendTransaction(signer, chainIds[0], iovAddress as Address, amount, memo).then((response: any) => {
        this.props.history.goBack();
      });
    }
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
  signer: getSigner(state),
  chainIds: getChainIds(state),
});

export const SendTokenPage = withRouter(connect(mapStateToProps)(SendToken));
