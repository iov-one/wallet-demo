import * as React from "react";
import { FormType } from "~/components/forms/Form";
import PageColumn from "~/components/pages/PageColumn";
import LeftSidebar from "../LeftSidebar";
import StepsCount from "../StepsCount";
import NoticeBox from "./NoticeBox";
import RecoverWordsForm from "./RecoverWordsForm";

const StepsSection = () => <StepsCount stepNum={1} />;

const LeftSidebarSection = () => (
  <LeftSidebar>
    <NoticeBox />
  </LeftSidebar>
);

interface Props {
  readonly onSubmit: (mnemonic: string) => Promise<void>;
}

export default class Layout extends React.Component<Props> {
  /*
   * Extracts field values by order of the field name and put them into array accordingly
   * then create mnemonic string from the array of words
   */
  public readonly onRecoverProfile = (values: object): void => {
    const typedValues = values as FormType;
    const words = Object.getOwnPropertyNames(typedValues)
      .sort()
      .map((fieldName: string) => typedValues[fieldName]);

    this.props.onSubmit(words.join(" "));
  };

  public render(): JSX.Element {
    return (
      <PageColumn
        icon="black"
        leftMenu={LeftSidebarSection}
        onSubmit={this.onRecoverProfile}
        primaryTitle="Your"
        secondaryTitle="backup phrase"
        subtitle="Enter your 12 word phrase, lowercase, to recover your funds &amp; transactions."
        renderHeader={StepsSection}
        formRender={RecoverWordsForm}
        nextMsg="Continue"
      />
    );
  }
}
