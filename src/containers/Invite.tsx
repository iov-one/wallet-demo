import React from "react";

import { PageStructure } from "../components/templates/page";
import { InviteInfo } from "../components/templates/sections";

export class InvitePage extends React.Component<{}> {
  public render(): JSX.Element {
    return (
      <PageStructure>
        <InviteInfo referralLink="iov.one/vicotr7d" />
      </PageStructure>
    );
  }
}
