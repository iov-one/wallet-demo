import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import React, { PureComponent } from "react";
import Button from "~/components/layout/Button";
import Dialog from "./dialog";

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
    const submitButtons = (
      <React.Fragment>
        <Button onClick={onClose} variant="contained" color="primary" className={classes.button}>
          Continue
        </Button>
      </React.Fragment>
    );

    return (
      <Dialog showDialog={showDialog} onClose={onClose} dialogButtons={submitButtons}>
        {children}
      </Dialog>
    );
  }
}

export const Prompt = withStyles(styles)(PromptDialog);
