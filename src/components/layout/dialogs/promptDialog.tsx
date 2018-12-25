import { createStyles, WithStyles, withStyles } from "@material-ui/core";
<<<<<<< HEAD
import Dialog from "@material-ui/core/Dialog";
import MuiDialogActions from "@material-ui/core/DialogActions";
import React, { PureComponent } from "react";
import Button from "~/components/layout/Button";
import DialogContent from "./components/DialogContent";
import DialogTitle from "./components/DialogTitle";
=======
import React, { PureComponent } from "react";
import Button from "~/components/layout/Button";
import Dialog from "./dialog";
>>>>>>> 4d5db376cd2627ffad81fe9dc2a8da657d0656e0

const styles = createStyles({
  button: {
    width: "100%",
  },
});

interface Props extends WithStyles<typeof styles> {
  readonly showDialog: boolean;
  readonly onClose: () => void;
  readonly children: JSX.Element;
}

interface State {
  readonly open: boolean;
}

export class PromptDialog extends PureComponent<Props, State> {
  public render(): JSX.Element {
    const { showDialog, onClose, children, classes } = this.props;

    return (
      <Dialog onClose={onClose} open={showDialog}>
        <DialogTitle onClose={onClose} />
        <DialogContent>
          {children}
        </DialogContent>
        <MuiDialogActions>
        <Button onClick={onClose} variant="contained" color="primary" size="large" className={classes.button}>
          Continue
        </Button>
        </MuiDialogActions>
      </Dialog>
    );
  }
}

export const Prompt = withStyles(styles)(PromptDialog);
