import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogActions from "@material-ui/core/DialogActions";
import React, { PureComponent } from "react";
import Button from "~/components/layout/Button";
import Typography from "~/components/layout/Typography";
import DialogContent from "./components/DialogContent";
import DialogTitle from "./components/DialogTitle";

const styles = createStyles({
  button: {
    width: "100%",
  },
});

interface Props extends WithStyles<typeof styles> {
  readonly title: string;
  readonly buttonName: string;
  readonly showDialog: boolean;
  readonly onClose: () => void;
  readonly onSubmit: () => void;
  readonly children: React.ReactNode;
}

class MessageDialog extends PureComponent<Props, {}> {
  public readonly onSubmit = (): void => {
    this.props.onSubmit();
    this.props.onClose();
  };

  public render(): JSX.Element {
    const { title, buttonName, showDialog, onClose, onSubmit, children, classes } = this.props;
    return (
      <Dialog onClose={onClose} open={showDialog}>
        <DialogTitle onClose={onClose} />
        <DialogContent>
          <React.Fragment>
            <Typography variant="h4">{title}</Typography>
            <Typography weight="light" variant="h6">
              {children}
            </Typography>
          </React.Fragment>
        </DialogContent>
        <MuiDialogActions>
          <Button
            onClick={onSubmit}
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
          >
            {buttonName}
          </Button>
        </MuiDialogActions>
      </Dialog>
    );
  }
}

export const Message = withStyles(styles)(MessageDialog);
