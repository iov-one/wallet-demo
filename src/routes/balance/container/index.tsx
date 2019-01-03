import * as React from "react";
import { connect } from "react-redux";
import PageMenu from "~/components/pages/PageMenu";
import Layout from "~/routes/balance/components";
import selector, { SelectorProps } from "./selector";

class Balance extends React.Component<SelectorProps> {
  public render(): JSX.Element {
    const { name, tokens } = this.props;

    return (
      <PageMenu phoneFullWidth>
        <Layout name={name} tokens={tokens} />
      </PageMenu>
    );
  }
}

export default connect(selector)(Balance);
