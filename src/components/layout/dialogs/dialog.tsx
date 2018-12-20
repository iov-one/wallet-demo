import { createStyles, DialogContent, Theme, withStyles, WithStyles } from "@material-ui/core";
import Button from "~/components/layout/Button";
import Dialog from "@material-ui/core/Dialog";
import React, { PureComponent } from "react";

const styles = (theme: Theme) =>
  createStyles({
    closeIcon: {
      fill: theme.palette.primary.main,
    },

    paper: {
      overflow: "visible",
    },

    closeButton: {
      position: "absolute",
      right: 0,
      top: -40,
    },

    button: {
      position: "relative",
      top: 65,
      width: "calc(100% - 60px)",
      margin: "auto",
    }
  });

interface Props extends WithStyles<typeof styles> {
  readonly showDialog: boolean;
  readonly submitButton: string;
  readonly onClose: () => void;
  readonly onSubmit: () => void;
  readonly children: React.ReactNode;
}

interface State {
  readonly open: boolean;
}
// TODO for using openHoc
class BaseDialog extends PureComponent<Props, State> {
  public readonly state = {
    open: false,
  };

  public render(): JSX.Element {
    const { classes, showDialog, submitButton, onClose, onSubmit, children } = this.props;

    return (
      <Dialog
        onClose={onClose}
        classes={{ paper: classes.paper }}
        aria-labelledby="customized-dialog-title"
        open={showDialog}
      >
        <svg
          className={classes.closeButton}
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="none"
          viewBox="0 0 26 26"
          onClick={onClose}
        >
          <path
            className={classes.closeIcon}
            fill="#D5D9DB"
            d="M1.543 0L0 1.543l.776.767L11.457 13 0 24.457 1.543 26 13 14.543l10.681 10.69.776.767L26 24.457l-.767-.776L14.543 13 26 1.543 24.457 0 13 11.457 2.31.776 1.543 0z"
          />
        </svg>
        <DialogContent>{children}</DialogContent>
        <Button onClick={onSubmit} variant="contained" color="primary" className={classes.button}>
          {submitButton}
        </Button>
      </Dialog>
    );
  }
}

export default withStyles(styles)(BaseDialog);
