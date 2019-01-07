import * as React from "react";
import PageColumn from "~/components/pages/PageColumn";
import LeftSidebar from "./LeftSidebar";
import ReadyMsg from "./ReadyMsg";
import StepsCount from "./StepsCount";
import { UpdatePassForm } from "./UpdatePassForm";

const StepsSection = () => <StepsCount stepNum={2}/>;

const LeftSidebarSection = () => (
  <LeftSidebar>
    <ReadyMsg />
  </LeftSidebar>
);

export default class Layout extends React.Component {
  public shouldComponentUpdate(): boolean {
    return false;
  }

  public render(): JSX.Element {
    return (
      <React.Fragment>
        <PageColumn
          icon="black"
          leftMenu={LeftSidebarSection}
          onSubmit={() => true}
          primaryTitle="Set up"
          secondaryTitle="a new password"
          subtitle="Set up a new password for your wallet."
          renderHeader={StepsSection}
          formRender={UpdatePassForm}
          nextMsg="Continue"
        />
      </React.Fragment>
    );
  }
}
