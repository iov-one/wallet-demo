import React, { PureComponent } from "react";
import Typography from '@material-ui/core/Typography';

import MainStyles from "./index.scss";
import BaseDialog from "../BaseDialog";


interface Props {
  readonly title: string;
  readonly showDialog: boolean;
  readonly onClose: () => any;
  readonly children: React.ReactNode;
}

interface State {
  readonly open: boolean;
}

class PromptDialog extends PureComponent<Props, State> {
  public readonly state = {
    open: false,
  };
  

  public render(): JSX.Element {
    const {
      title,
      showDialog,
      onClose,
      children,
    } = this.props;

    return (
      <BaseDialog
        showDialog={showDialog}
        onClose={onClose}
        onSubmit={onClose}
        submitButton="Continue"
      >
        <h1>Prompt dialog content should be here</h1>        
      </BaseDialog >
    );
  }
}

export default PromptDialog;