import * as React from "react";
import { connect } from "react-redux";
import PageMenu from "~/components/pages/PageMenu";
import Layout from "../components";
import ProfileNotFound from "../components/ProfileNotFound";
import selectors, { SelectorProps } from "./selector";

class RecoveryPhrase extends React.Component<SelectorProps> {
  public render(): JSX.Element {
    const { profile } = this.props;

    return (
      <PageMenu phoneFullWidth>
        {profile ? <Layout profile={profile} wallet={profile.wallets.value[0]} /> : <ProfileNotFound />}
      </PageMenu>
    );
  }
}

export default connect(selectors)(RecoveryPhrase);
