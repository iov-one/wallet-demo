import * as React from "react";
import PageMenu from "~/components/pages/PageMenu";
import { MatchMediaContext } from "~/context/MatchMediaContext";
import Layout from "../components";

class Transactions extends React.Component {
  public render(): JSX.Element {
    return (
      <MatchMediaContext.Consumer>
        {phone => {
          return (
            <PageMenu phoneFullWidth padding={false}>
              <Layout phone={phone} />
            </PageMenu>
          );
        }}
      </MatchMediaContext.Consumer>
    );
  }
}

export default Transactions;
