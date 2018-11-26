import React from "react";

import { InviteScreenWrapper } from "../components/subComponents/wrappers";
import { PageStructure } from "../components/templates/page";
import { InviteDescription, InviteInfo } from "../components/templates/sections";

export class InvitePage extends React.Component<{}> {
  public render(): JSX.Element {
    return (
      <PageStructure>
        <InviteScreenWrapper>
          <InviteInfo referralLink="iov.one/vicotr7d" />
          <InviteDescription />
        </InviteScreenWrapper>
      </PageStructure>
    );
  }
}
