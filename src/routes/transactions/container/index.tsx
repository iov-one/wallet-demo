import * as React from "react";
import { Item } from "~/components/forms/SelectField";
import PageMenu from "~/components/pages/PageMenu";
import { MatchMediaContext } from "~/context/MatchMediaContext";
import { Layout } from "../components";

class Transactions extends React.Component {
  public readonly onChangeRows = (_: Item) => {
    //TX limit logic here
  };
  public render(): JSX.Element {
    return (
      <MatchMediaContext.Consumer>
        {phone => {
          return (
            <PageMenu phoneFullWidth padding={false}>
              <Layout phone={phone} onChangeRows={this.onChangeRows} />
            </PageMenu>
          );
        }}
      </MatchMediaContext.Consumer>
    );
  }
}

export default Transactions;
