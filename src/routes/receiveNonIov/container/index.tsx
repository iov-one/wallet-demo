import * as React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Item } from "~/components/forms/SelectField";
import PageMenu from "~/components/pages/PageMenu";
import ReceiveNonIovLayout from "~/routes/receiveNonIov/components";
import selector, { SelectorProps } from "./selector";

const Layout = styled.div`
  display: flex;
  justify-content: center;
`;

export interface TickerWithAddress extends Item {
  readonly address: string;
}

class RecieveNonIov extends React.Component<SelectorProps> {
  public render(): JSX.Element {
    const { tickersList } = this.props;

    return (
      <PageMenu phoneFullWidth>
        <Layout>
          <ReceiveNonIovLayout tickersList={tickersList} />
        </Layout>
      </PageMenu>
    );
  }
}

export default connect(selector)(RecieveNonIov);
