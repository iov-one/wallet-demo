import * as React from "react";
import styled from "styled-components";
import PageMenu from "~/components/pages/PageMenu";
import { SuggestionButton } from "~/components/subComponents/buttons";
import { RECEIVE_FROM_NON_IOV_USER } from "~/routes";
import ReceiveIovLayout from "~/routes/receiveIov/components";
import { history } from "~/store"

const Layout = styled.div`
  display: flex;
  justify-content: center;
`;


class RecieveIov extends React.Component {
  public readonly onReceiveExpernal = () => {
    history.push(RECEIVE_FROM_NON_IOV_USER);
  }

  public render(): JSX.Element {
    return (
      <PageMenu phoneFullWidth>
        <Layout>
          <ReceiveIovLayout iovAddress="adolfo*iov" />
        </Layout>
        <SuggestionButton suggestionText="Receiving from outside IOV?" buttonText="View your address" onClick={this.onReceiveExpernal} />
      </PageMenu>
    );
  }
}

export default RecieveIov;
