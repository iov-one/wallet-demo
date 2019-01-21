import * as React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import PageMenu from "~/components/pages/PageMenu";
import { SuggestionButton } from "~/components/subComponents/buttons";
import { RECEIVE_FROM_NON_IOV_USER } from "~/routes";
import ReceiveIovLayout from "~/routes/receiveIov/components";
import { history } from "~/store";
import selector, { SelectorProps } from "./selector";

const Layout = styled.div`
  display: flex;
  justify-content: center;
`;

const IOV_NAMESPACE = "*iov"

class RecieveIov extends React.Component<SelectorProps> {
  public readonly onReceiveExpernal = () => {
    history.push(RECEIVE_FROM_NON_IOV_USER);
  };

  public render(): JSX.Element {
    const { accountName } = this.props;
    const iovAddress = accountName ? `${accountName}${IOV_NAMESPACE}` : "--"

    return (
      <PageMenu phoneFullWidth>
        <Layout>
          <ReceiveIovLayout iovAddress={iovAddress} />
        </Layout>
        <SuggestionButton
          suggestionText="Receiving from outside IOV?"
          buttonText="View your address"
          onClick={this.onReceiveExpernal}
        />
      </PageMenu>
    );
  }
}

export default connect(selector)(RecieveIov);
