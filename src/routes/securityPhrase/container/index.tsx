import * as React from "react";
import { connect } from "react-redux";
import PageColumn from "~/components/pages/PageColumn";
import { SECURITY_CENTER_ROUTE } from "~/routes";
import { history } from "~/store";
import { HeaderMessage } from "../components/HeaderMessage";
import NoticeBox from "../components/NoticeBox";
import { RecoveryWords } from "../components/RecoveryWords";
import selectors, { SelectorProps } from "../container/selector";

const NoticeBoxSection = () => <NoticeBox />;

class RecoveryPhrase extends React.Component<SelectorProps> {
  public readonly onRedirect = () => {
    history.push(SECURITY_CENTER_ROUTE);
  };

  public render(): JSX.Element {
    const { mnemonic } = this.props;
    const RecoveryWordsRender = () => <RecoveryWords mnemonic={mnemonic} />;

    return (
      <PageColumn
        icon="black"
        leftMenu={NoticeBoxSection}
        onSubmit={this.onRedirect}
        primaryTitle="Write down"
        secondaryTitle="these words on a piece of paper"
        subtitle="Do not store your recovery phrase on your computer or anywhere online."
        renderHeader={HeaderMessage}
        formRender={RecoveryWordsRender}
        nextMsg="Done"
      />
    );
  }
}

export default connect(selectors)(RecoveryPhrase);
