import * as React from "react";
import { connect } from "react-redux";
import PageMenu from "~/components/pages/PageMenu";
import Layout from "~/routes/receiveNonIov/components";
import selector, { SelectorProps } from "./selector";

class RecieveNonIov extends React.Component<SelectorProps> {
  public render(): JSX.Element {
    const { tickersList } = this.props;

    return (
      <PageMenu phoneFullWidth>
        <Layout tickersList={tickersList} />
      </PageMenu>
    );
  }
}

export default connect(selector)(RecieveNonIov);
