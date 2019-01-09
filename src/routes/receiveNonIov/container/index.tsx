import * as React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import PageMenu from "~/components/pages/PageMenu";
import ReceiveNonIovLayout from "~/routes/receiveNonIov/components";
import selector, { SelectorProps } from "./selector";

const Layout = styled.div`
  display: flex;
  justify-content: center;
`;

class RecieveNonIov extends React.Component<SelectorProps> {
  public render(): JSX.Element {
    const { addressList } = this.props;

    return (
      <PageMenu phoneFullWidth>
        <Layout>
          <ReceiveNonIovLayout addressList={addressList} />
        </Layout>
      </PageMenu>
    );
  }
}

export default connect(selector)(RecieveNonIov);