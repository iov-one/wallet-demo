import Dialog from "@material-ui/core/Dialog";
import MuiDialogActions from "@material-ui/core/DialogActions";
import React from "react";
import Block from "~/components/layout/Block";
import Button from "~/components/layout/Button";
import Img from "~/components/layout/Image";
import Typography from "~/components/layout/Typography";
import DialogContent from "./components/DialogContent";
import DialogTitle from "./components/DialogTitle";

interface Props {
  readonly icon: string;
  readonly title: string;
  readonly showDialog: boolean;
  readonly onClose: () => void;
  readonly children: JSX.Element;
}

export const Alert = ({ icon, title, showDialog, onClose, children }: Props): JSX.Element => {
  return (
    <Dialog onClose={onClose} open={showDialog}>
      <DialogTitle onClose={onClose} />
      <DialogContent>
        <React.Fragment>
          <Block align="center">
            <Img src={icon} alt="Alert icon" />
          </Block>
          <Typography variant="h4" align="center">
            {title}
          </Typography>
          <Typography align="center" weight="light" variant="h6">
            {children}
          </Typography>
        </React.Fragment>
      </DialogContent>
      <MuiDialogActions>
        <Button onClick={onClose} variant="contained" color="primary" size="large" fullWidth>
          Got it
        </Button>
      </MuiDialogActions>
    </Dialog>
  );
};
