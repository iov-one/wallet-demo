import queryString from "query-string";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import styled from "styled-components";

import { TokenTicker } from "@iov/bcp-types";
import { ChainId } from "@iov/core";

import PageMenu from "~/components/pages/PageMenu";
import { SendTokenForm, SendTokenFormState } from "~/components/templates/forms";
import { AccountInfo } from "~/reducers/blockchain";
import { getChainIds, getMyAccounts } from "~/selectors";

interface SendTokenProps extends RouteComponentProps<{ readonly iovAddress: string }> {
  readonly accounts: ReadonlyArray<AccountInfo>;
  readonly chainIds: ReadonlyArray<ChainId>;
}

const Layout = styled.div`
  display: flex;
  justify-content: center;
`;

class SendPayment extends React.Component<SendTokenProps> {
  public readonly onSend = (transInfo: SendTokenFormState): any => {
    const { history } = this.props;
    const { iovAddress } = this.props.match.params;
    const { tokenAmount, memo, token } = transInfo;
    const memoString = memo === "" ? "" : `/?memo=${memo}`;
    history.push(`/confirm-transaction/${iovAddress}/${token}/${tokenAmount}${memoString}`);
  };

  public render(): JSX.Element | boolean {
    // TODO: we should really iterate over all accounts... this is a work-around for demo
    const account = this.props.accounts[0];
    if (!account || !account.account) {
      return false;
    }
    const name = `${account.username}*iov`;
    const balances = account.account.balance;
    if (balances.length === 0) {
      return false;
    }
    const { iovAddress } = this.props.match.params;
    const query = queryString.parse(this.props.location.search);
    const token = (query.token as string) || "IOV";

    return (
      <PageMenu phoneFullWidth>
        <Layout>
          <SendTokenForm
            name={name}
            defaultToken={token as TokenTicker}
            iovAddress={iovAddress}
            balances={balances}
            onBack={this.props.history.goBack}
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

export const SendPaymentPage = withRouter(connect(mapStateToProps)(SendPayment));
