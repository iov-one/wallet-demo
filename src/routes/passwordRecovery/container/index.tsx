import React from "react";
import Layout from "../components";

class SecurityCenter extends React.Component<{}, {}> {
  public shouldComponentUpdate(): boolean {
    return false;
  }

  public render(): JSX.Element {
    return <Layout />;
  }
}

export default SecurityCenter;
