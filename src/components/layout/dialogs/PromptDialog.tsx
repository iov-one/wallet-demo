import Dialog from "@material-ui/core/Dialog";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { FormState, FormSubscription } from "final-form";
import React, { PureComponent } from "react";
import Form from "~/components/forms/Form";
import Button from "~/components/layout/Button";
import DialogContent from "./components/DialogContent";
import DialogTitle from "./components/DialogTitle";

interface Props {
  readonly showDialog: boolean;
  readonly onClose: () => void;
  readonly onSubmit: (values: any) => Promise<boolean>;
  readonly validation?: (values: any) => object | Promise<object>;
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

export class Prompt extends PureComponent<Props, State> {
  public readonly onSubmit = async (values: object): Promise<void> => {
    const submitResult = await this.props.onSubmit(values);
    if (submitResult) {
      this.props.onClose();
    }
  };

  public render(): JSX.Element {
    const { showDialog, onClose, validation, children } = this.props;

    return (
      <Dialog onClose={onClose} open={showDialog}>
        <DialogTitle onClose={onClose} />
        <Form onSubmit={this.onSubmit} subscription={subscription} validation={validation} grow>
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
                  fullWidth
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
