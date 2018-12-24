// import Typography from "@material-ui/core/Typography";
import React, { PureComponent } from "react";
import Dialog from "./dialog";
// import MainStyles from "./index.scss";

interface Props {
  readonly showDialog: boolean;
  readonly onClose: () => void;
  readonly children: JSX.Element;
}

interface State {
  readonly open: boolean;
}

export class Prompt extends PureComponent<Props, State> {
  public render(): JSX.Element {
    const { showDialog, onClose, children } = this.props;

    return (
      <Dialog showDialog={showDialog} onClose={onClose} onSubmit={onClose} submitButton="Continue">
        {children}
      </Dialog>
    );
  }
}
