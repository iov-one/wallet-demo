import * as React from "react";
import PageColumn from "~/components/pages/PageColumn";
import { SECURITY_CENTER_ROUTE } from "~/routes";
import { history } from "~/store";
import { HeaderMessage } from "../components/HeaderMessage";
import LeftSidebarWrapper from "../components/LeftSidebarWrapper";
import NoticeBox from "../components/NoticeBox";
import RecoveryWords from "../components/RecoveryWords";

const LeftSidebarSection = () => (
  <LeftSidebarWrapper>
    <NoticeBox />
  </LeftSidebarWrapper>
);

export default class RecoveryPhrase extends React.Component {
  public readonly onRedirect = () => {
    history.push(SECURITY_CENTER_ROUTE);
  };

  public render(): JSX.Element {
    return (
      <PageColumn
        icon="black"
        leftMenu={LeftSidebarSection}
        onSubmit={this.onRedirect}
        primaryTitle="Write down"
        secondaryTitle="these words on a piece of paper"
        subtitle="Do not store your backup phrase on your computer or anywhere online."
        renderHeader={HeaderMessage}
        formRender={RecoveryWords}
        nextMsg="Done"
      />
    );
  }
}
