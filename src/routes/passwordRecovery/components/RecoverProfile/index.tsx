import * as React from "react";
import { FormType } from "~/components/forms/Form";
import PageColumn from "~/components/pages/PageColumn";
import LeftSidebar from "../LeftSidebar";
import StepsCount from "../StepsCount";
import NoticeBox from "./NoticeBox";
import RecoverWordsForm, { WORD_NUM } from "./RecoverWordsForm";

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
    const words = new Array<string>(12);

    Object.getOwnPropertyNames(typedValues).forEach((property: string) => {
      const valueIdx = parseInt(property.substring(WORD_NUM.length), 10);
      if (!isNaN(valueIdx)) {
        // tslint:disable-next-line:no-object-mutation
        words[valueIdx] = typedValues[property];
      }
    });

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
