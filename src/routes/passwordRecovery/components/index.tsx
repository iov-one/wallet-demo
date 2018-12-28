import * as React from "react";
import PageColumn from "~/components/pages/PageColumn";
import FormComponent from "./FormComponent";
import PeopleImg from "./LeftMenu";
import {StepsCount} from "./StepsCount";

const StepsSection = () => <StepsCount />;


export default class Layout extends React.Component {
  public shouldComponentUpdate(): boolean {
    return false;
  }

  public render(): JSX.Element {

    return (
      <React.Fragment>
        <PageColumn
          icon="white"
          leftMenu={PeopleImg}
          onSubmit={() => true}
          primaryTitle="Your"
          secondaryTitle="backup phrase"
          subtitle="Enter your 12 word phrase, lowercase, to recover your funds &amp; transactions."
          renderHeader={StepsSection}
          formRender={FormComponent}
          nextMsg="Continue"
        />
      </React.Fragment>
    );
  }
}
