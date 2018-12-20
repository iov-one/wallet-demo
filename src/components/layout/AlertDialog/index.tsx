import React, { PureComponent } from "react";
import { withStyles, Theme, createStyles, WithStyles, DialogContent } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';

import MainStyles from "./index.scss";
import BaseDialog from "../BaseDialog";


const styles = (theme: Theme) => createStyles({
  closeIcon: {
    fill: theme.palette.primary.main,
  },
});

interface Props extends WithStyles<typeof styles> {
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
    const {
      icon,
      title,
      showDialog,
      onClose,
      children,
    } = this.props;

    return (
      <BaseDialog showDialog={showDialog} onClose={onClose}>
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
      </BaseDialog >
    );
  }
}

export default withStyles(styles)(AlertDialog);