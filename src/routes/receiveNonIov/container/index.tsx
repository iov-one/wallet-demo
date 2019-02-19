import * as React from "react";
import { connect } from "react-redux";
import PageMenu from "~/components/pages/PageMenu";
import selector, { SelectorProps } from "./selector";

import Layout from "../components";

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
