import Typography from "@material-ui/core/Typography";
import React, { PureComponent } from "react";

import BaseDialog from "../BaseDialog";
import MainStyles from "./index.scss";

interface Props {
  readonly icon: string;
  readonly title: string;
  readonly showDialog: boolean;
  readonly onClose: () => any;
  readonly children: React.ReactNode;
}

interface State {
  readonly open: boolean;
}

class AlertDialog extends PureComponent<Props, State> {
  public readonly state = {
    open: false,
  };

  public render(): JSX.Element {
    const { icon, title, showDialog, onClose, children } = this.props;

    return (
      <BaseDialog showDialog={showDialog} onClose={onClose} onSubmit={onClose} submitButton="Got it">
        <div className={MainStyles["alert-dialog"]}>
          <div className={MainStyles["icon-parent"]}>
            <img src={icon} />
          </div>
          <Typography gutterBottom variant="h4" align="center">
            {title}
          </Typography>
          <Typography align="center" className={MainStyles.message}>
            {children}
          </Typography>
        </div>
      </BaseDialog>
    );
  }
}

export default AlertDialog;
