import * as React from "react";
import PageColumn from "~/components/pages/PageColumn";
import LeftSidebar from "./LeftSidebar";
import NoticeBox from "./NoticeBox";
import RecoverWordsForm from "./RecoverWordsForm";
import StepsCount from "./StepsCount";
 
const StepsSection = () => <StepsCount stepNum={1}/>;

const LeftSidebarSection = () => (
  <LeftSidebar>
    <NoticeBox />
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
          primaryTitle="Your"
          secondaryTitle="backup phrase"
          subtitle="Enter your 12 word phrase, lowercase, to recover your funds &amp; transactions."
          renderHeader={StepsSection}
          formRender={RecoverWordsForm}
          nextMsg="Continue"
        />
      </React.Fragment>
    );
  }
}
