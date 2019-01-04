import { BcpAccount, TokenTicker } from "@iov/bcp-types";
import { ChainId } from "@iov/core";
import { get } from "lodash";
import queryString from "query-string";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import styled from "styled-components";
import PageMenu from "~/components/pages/PageMenu";
import { SendTokenForm, SendTokenFormState } from "../components/templates/forms";
import { ChainAccount, getChainIds, getMyAccounts } from "../selectors";

interface SendTokenProps extends RouteComponentProps<{ readonly iovAddress: string }> {
  readonly accounts: ReadonlyArray<ChainAccount>;
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
