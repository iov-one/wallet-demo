import * as React from "react";
import PageColumn from "~/components/pages/PageColumn";
import { SECURITY_CENTER_ROUTE } from "~/routes";
import { history } from "~/store";
import { HeaderMessage } from "./HeaderMessage";
import LeftSidebarWrapper from "./LeftSidebarWrapper";
import NoticeBox from "./NoticeBox";
import RecoveryWords from "./RecoveryWords";

const LeftSidebarSection = () => (
  <LeftSidebarWrapper>
    <NoticeBox />
  </LeftSidebarWrapper>
);


export default class Layout extends React.Component {

  public readonly onRedirect = () => {
    history.push(SECURITY_CENTER_ROUTE);
  }

  public render(): JSX.Element {
    return (
      <PageColumn
        icon="black"
        leftMenu={LeftSidebarSection}
        onSubmit={this.onRedirect}
        primaryTitle="Write down"
        secondaryTitle="these words on a piece of paper"
        subtitle="Do not store your backup phrase on your computer or anywhere online. It is very important to keep your backup phrase offline in a private place."
        renderHeader={HeaderMessage}
        formRender={RecoveryWords}
        nextMsg="Done"
      />
    );
  }
}
