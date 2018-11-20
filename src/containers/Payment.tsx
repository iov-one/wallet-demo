import { get } from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { RouteComponentProps, withRouter } from "react-router";

import { BcpConnection } from "@iov/bcp-types";

import { AddressInputForm } from "../components/templates/forms";
import { PageStructure } from "../components/templates/page";

import { ChainAccount, getConnections, getMyAccounts } from "../selectors";

interface PaymentProps extends RouteComponentProps<{}> {
  readonly accounts: ReadonlyArray<ChainAccount>;
  readonly connections: { readonly [chainId: string]: BcpConnection };
  readonly identity: any;
}

const ContentWrapper = styled.div`
  margin-top: 50px;
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
    const { history } = this.props;
    history.push(`/send-payment/${address}/`);
  };

  public render(): JSX.Element | boolean {
    const { accounts } = this.props;
    const account = get(accounts, "[0].account", false);
    if (!account) {
      return false;
    }
    const { connections } = this.props;
    const chainIds = Object.keys(connections);
    const connection = connections[chainIds[0]];
    return (
      <PageStructure activeNavigation="Payment">
        <ContentWrapper>
          <AddressInputForm connection={connection} onNext={this.onSend} />
        </ContentWrapper>
      </PageStructure>
    );
  }
}

// Updated with types like in Home.tsc
const mapStateToProps = (state: any, ownProps: PaymentProps): PaymentProps => ({
  ...ownProps,
  accounts: getMyAccounts(state),
  connections: getConnections(state),
});

export const PaymentPage = withRouter(connect(mapStateToProps)(Payment));
