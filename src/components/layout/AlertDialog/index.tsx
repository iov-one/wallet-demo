import React, { PureComponent } from "react";
import { withStyles, Theme, createStyles, WithStyles, DialogContent } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';

import "./index.scss";


const styles = (theme: Theme) => createStyles({
  paper: {
    overflow: "visible",
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: -40,
  },
  closeIcon: {
    fill: theme.palette.primary.main,
  },
  button: {
    position: "relative",
    top: 65,
    width: "calc(100% - 60px)",
    margin: "auto",
  },
  icon: {
    margin: "auto",
  },
  iconParent: {
    textAlign: "center",
  },
  message: {
    fontSize: '1.2em',
  }
});

interface AlertDialogProps extends WithStyles<typeof styles> {
  readonly icon: string;
  readonly title: string;
  readonly children: React.ReactNode;
}


class AlertDialog extends PureComponent<AlertDialogProps> {
  public readonly state = {
    open: false,
  };

  public handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  public handleClose = () => {
    this.setState({ open: false });
  };

  public render(): JSX.Element {
    const {
      classes,
      icon,
      title,
      children,      
    } = this.props;

    return (
      <div>
        <Button variant="outlined" color="secondary" onClick={this.handleClickOpen}>
          Open dialog
        </Button>
        <Dialog
          onClose={this.handleClose}
          classes={{ paper: classes.paper }}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
        >
          <svg className={classes.closeButton} xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 26 26" onClick={this.handleClose}>
            <path className={classes.closeIcon} fill="#D5D9DB" d="M1.543 0L0 1.543l.776.767L11.457 13 0 24.457 1.543 26 13 14.543l10.681 10.69.776.767L26 24.457l-.767-.776L14.543 13 26 1.543 24.457 0 13 11.457 2.31.776 1.543 0z" />
          </svg>
          <DialogContent>
            <div className={classes.iconParent}>
              <img src={icon} />
            </div>
            <Typography gutterBottom variant="h4" align="center">
              {title}              
            </Typography>
            <Typography gutterBottom align="center" className={classes.message}>
              {children}              
            </Typography>
          </DialogContent>
          <Button onClick={this.handleClose} variant="contained" color="primary" className={classes.button}>
            Got it
          </Button>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(AlertDialogStyles)(AlertDialog);