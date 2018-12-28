import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { FormState, FormSubscription } from "final-form";
import React, { PureComponent } from "react";
import Form from "~/components/forms/Form";
import Block from "~/components/layout/Block";
import Button from "~/components/layout/Button";
import DialogContent from "./components/DialogContent";
import DialogTitle from "./components/DialogTitle";

const styles = createStyles({
  button: {
    width: "100%",
  },
});

interface Props extends WithStyles<typeof styles> {
  readonly showDialog: boolean;
  readonly onClose: () => void;
  readonly onSubmit: (values: object) => void;
  readonly validation?: (values: object) => object | Promise<object>;
  readonly children: JSX.Element;
}

interface State {
  readonly open: boolean;
}

const subscription: FormSubscription = {
  valid: true,
  submitting: true,
  validating: true,
};

export class PromptDialog extends PureComponent<Props, State> {
  public render(): JSX.Element {
    const { showDialog, onClose, onSubmit, validation, children, classes } = this.props;

    return (
      <Dialog onClose={onClose} open={showDialog}>
        <DialogTitle onClose={onClose} />
        <Form onSubmit={onSubmit} subscription={subscription} validation={validation} grow>
          {({ valid, submitting, validating }: FormState) => (
            <React.Fragment>
              <DialogContent>{children}</DialogContent>
              <MuiDialogActions>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                  disabled={!valid || submitting || validating}
                  className={classes.button}
                >
                  Continue
                </Button>
              </MuiDialogActions>
            </React.Fragment>
          )}
        </Form>
      </Dialog>
    );
  }
}

export const Prompt = withStyles(styles)(PromptDialog);
