import * as React from "react";
import PageMenu from "~/components/pages/PageMenu";
import Layout from "../components";

class SecurityCenter extends React.Component {
  public render(): JSX.Element {
    return (
      <PageMenu>
        <Layout />
      </PageMenu>
    );
  }
}

export default SecurityCenter;
