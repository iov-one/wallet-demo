import { createStyles, DialogContent, withStyles, WithStyles } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import React, { PureComponent } from "react";
import Block from "~/components/layout/Block";
import Img from "~/components/layout/Image";
import CloseIcon from "../../../../resources/close_type2.svg";

const styles = createStyles({
  paper: {
    overflow: "visible",
    boxShadow: "0 0 14px 0 #edeff4",
    border: "1px solid #f3f3f3",
  },

  closeButton: {
    position: "absolute",
    right: 0,
    top: -66,
  },

  button: {
    position: "relative",
    top: 68,
    width: "calc(100% - 60px)",
    margin: "auto",
  },
});

interface Props extends WithStyles<typeof styles> {
  readonly showDialog: boolean;
  readonly onClose: () => void;
  readonly children: React.ReactNode;
  readonly dialogButtons: JSX.Element;
}

// TODO for using openHoc
class BaseDialog extends PureComponent<Props, {}> {
  private readonly paperClass = { paper: this.props.classes.paper };

  public render(): JSX.Element {
    const { classes, showDialog, onClose, children, dialogButtons } = this.props;

    return (
      <Dialog
        onClose={onClose}
        classes={this.paperClass}
        aria-labelledby="customized-dialog-title"
        open={showDialog}
        hideBackdrop={true}
      >
        <Img src={CloseIcon} alt="Close" onClick={onClose} className={classes.closeButton} />
        <DialogContent>{children}</DialogContent>
        <Block className={classes.button}>{dialogButtons}</Block>
      </Dialog>
    );
  }
}

export default withStyles(styles)(BaseDialog);
