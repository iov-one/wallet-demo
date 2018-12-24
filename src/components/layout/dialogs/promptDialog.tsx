// import Typography from "@material-ui/core/Typography";
import React, { PureComponent } from "react";
import Dialog from "./dialog";
// import MainStyles from "./index.scss";

interface Props {
  readonly title: string;
  readonly showDialog: boolean;
  readonly onClose: () => void;
  readonly children: JSX.Element;
}

interface State {
  readonly open: boolean;
}

class PromptDialog extends PureComponent<Props, State> {
  public render(): JSX.Element {
    const { showDialog, onClose } = this.props;

    return (
      <Dialog showDialog={showDialog} onClose={onClose} onSubmit={onClose} submitButton="Continue">
        <h1>Prompt dialog content should be here</h1>
      </Dialog>
    );
  }
}

export default PromptDialog;
