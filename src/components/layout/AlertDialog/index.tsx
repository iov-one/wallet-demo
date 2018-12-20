import React, { PureComponent } from "react";
import { withStyles, Theme, createStyles, WithStyles, DialogContent } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';

import MainStyles from "./index.scss";


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
      classes,
      icon,
      title,
      showDialog,
      onClose,
      children,      
    } = this.props;

    return (
      <div>
        <Dialog
          onClose={onClose}
          className={MainStyles["alert-dialog"]}
          classes={{ paper: MainStyles.paper }}
          aria-labelledby="customized-dialog-title"
          open={showDialog}
        >
          <svg className={MainStyles["close-button"]} xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 26 26" onClick={onClose}>
            <path className={classes.closeIcon} fill="#D5D9DB" d="M1.543 0L0 1.543l.776.767L11.457 13 0 24.457 1.543 26 13 14.543l10.681 10.69.776.767L26 24.457l-.767-.776L14.543 13 26 1.543 24.457 0 13 11.457 2.31.776 1.543 0z" />
          </svg>
          <DialogContent>
            <div className={MainStyles["icon-parent"]}>
              <img src={icon} />
            </div>
            <Typography gutterBottom variant="h4" align="center">
              {title}              
            </Typography>
            <Typography align="center" className={MainStyles.message}>
              {children}              
            </Typography>
          </DialogContent>
          <Button onClick={onClose} variant="contained" color="primary" className={MainStyles.button}>
            Got it
          </Button>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(AlertDialog);