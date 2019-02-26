import * as React from "react";
import { connect } from "react-redux";
import PageMenu from "~/components/pages/PageMenu";
import Layout from "~/routes/receivePayment/receiveNonIov/components";
import selector, { SelectorProps } from "./selector";
const INITIAL_TOKEN = "IOV";

class RecieveNonIov extends React.Component<SelectorProps> {
  public render(): JSX.Element {
    const { tickersList } = this.props;
    const matchTicker = tickersList.find(item => item.name === INITIAL_TOKEN);
    const defaultTicker = matchTicker ? matchTicker : tickersList[0];

    return (
      <PageMenu phoneFullWidth>
        <Layout tickersList={tickersList} defaultTicker={defaultTicker} />
      </PageMenu>
    );
  }
}

export default connect(selector)(RecieveNonIov);
