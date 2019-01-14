import { get, isEmpty } from "lodash";
import queryString from "query-string";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import styled from "styled-components";

import { ChainId } from "@iov/base-types";
import { BnsConnection } from "@iov/bns";

import PageMenu from "~/components/pages/PageMenu";
import { AddressInputForm } from "~/components/templates/forms";
import { ChainAccount, getMyAccounts, requireBnsChainId, requireBnsConnection } from "~/selectors";

interface PaymentProps extends RouteComponentProps<{}> {
  readonly accounts: ReadonlyArray<ChainAccount>;
  readonly bnsId: ChainId;
  readonly connection: BnsConnection;
  readonly identity: any;
}

const Layout = styled.div`
  display: flex;
  justify-content: center;
`;

class Payment extends React.Component<PaymentProps> {
  public readonly state = {
    showReceiveModal: false,
    showAddressModal: false,
  };

  public componentDidMount(): void {
    const { accounts, history } = this.props;
    if (accounts.length === 0) {
      history.push("/");
    }
  }

  public readonly onSend = (address: string): any => {
    const { history, location } = this.props;
    const query = queryString.parse(location.search);
    const token = query.token as string;
    if (isEmpty(token)) {
      history.push(`/send-payment/${address}/`);
    } else {
      history.push(`/send-payment/${address}/?token=${token}`);
    }
  };

  public render(): JSX.Element | boolean {
    const { accounts, bnsId, connection } = this.props;
    const account = get(accounts, "[0].account", false);
    if (!account) {
      return false;
    }

    return (
      <PageMenu phoneFullWidth>
        <Layout>
          <AddressInputForm bnsId={bnsId} connection={connection} onNext={this.onSend} />
        </Layout>
      </PageMenu>
    );
  }
}

// Updated with types like in Home.tsc
const mapStateToProps = (state: any, ownProps: PaymentProps): PaymentProps => ({
  ...ownProps,
  accounts: getMyAccounts(state),
  bnsId: requireBnsChainId(state),
  connection: requireBnsConnection(state),
});

export const PaymentPage = withRouter(connect(mapStateToProps)(Payment));
