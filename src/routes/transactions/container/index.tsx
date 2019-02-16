import * as React from "react";
import { connect } from "react-redux";
import { Item } from "~/components/forms/SelectField";
import { Layout } from "../components";
import selector, { SelectorProps } from "./selector";

class Transactions extends React.Component<SelectorProps> {
  public readonly onChangeRows = (_: Item) => {
    //TX limit logic here
  };
  public render(): JSX.Element {
    const { txs } = this.props;
    return <Layout txs={txs} onChangeRows={this.onChangeRows} />;
  }
}

//export default Transactions;
export default connect(selector)(Transactions);
