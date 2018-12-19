import React, { PureComponent } from "react";
import { withStyles, Theme, createStyles, WithStyles } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
//import CloseIcon from '@material-ui/icons/Close';
import classNames from "classnames/bind";

import ComingSoonIcon from "../../../../resources/coming_soon.svg";

import styles from "./index.scss";

interface DialogTitleProps extends WithStyles<typeof styles> {
  readonly id: string;
  readonly onClose: () => any;
}

const DialogTitleStyles = (theme: Theme) => createStyles({
  root: {
    margin: 0,
    backgroundColor: "transparent",
    padding: 0,
    height: 5
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
  },
  svgColor: {
    fill: theme.palette.primary.main,
  }
});

const DialogTitleLayout = ({ classes, onClose }: DialogTitleProps) => {
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 26 26">
            <path className={classes.svgColor} fill="#D5D9DB" d="M1.543 0L0 1.543l.776.767L11.457 13 0 24.457 1.543 26 13 14.543l10.681 10.69.776.767L26 24.457l-.767-.776L14.543 13 26 1.543 24.457 0 13 11.457 2.31.776 1.543 0z" />
          </svg>
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
}
const DialogTitle = withStyles(DialogTitleStyles)(DialogTitleLayout);


/*const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});*/

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit,
  },
}))(MuiDialogActions);


const AlertDialogStyles = (theme: Theme) => createStyles({
  paper: {
    overflow: "visible",
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: -40,
  },
  svgColor: {
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
  }
});


class AlertDialog extends PureComponent<WithStyles<typeof AlertDialogStyles>> {
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
          <svg className={classes.closeButton} xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 26 26">
            <path className={classes.svgColor} fill="#D5D9DB" d="M1.543 0L0 1.543l.776.767L11.457 13 0 24.457 1.543 26 13 14.543l10.681 10.69.776.767L26 24.457l-.767-.776L14.543 13 26 1.543 24.457 0 13 11.457 2.31.776 1.543 0z" />
          </svg>
          <DialogContent>
            <img src={ComingSoonIcon} className={classes.icon} />
            <Typography gutterBottom>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
              scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
              auctor fringilla.
            </Typography>
          </DialogContent>
          <Button onClick={this.handleClose} variant="contained" color="primary" className={classes.button}>
            Save changes
          </Button>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(AlertDialogStyles)(AlertDialog);