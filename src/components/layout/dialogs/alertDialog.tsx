import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import React from "react";
import Block from "~/components/layout/Block";
import Button from "~/components/layout/Button";
import Img from "~/components/layout/Image";
import Typography from "~/components/layout/Typography";
import Dialog from "./dialog";

const styles = createStyles({
  button: {
    width: "100%",
  },
});

interface Props extends WithStyles<typeof styles> {
  readonly icon: string;
  readonly title: string;
  readonly showDialog: boolean;
  readonly onClose: () => void;
  readonly children: React.ReactNode;
}

const AlertDialog = ({ icon, title, showDialog, onClose, children, classes }: Props): JSX.Element => {
  const submitButtons = (
    <React.Fragment>
      <Button onClick={onClose} variant="contained" color="primary" className={classes.button}>
        Got it
      </Button>
    </React.Fragment>
  );
  return (
<<<<<<< HEAD
    <Dialog showDialog={showDialog} onClose={onClose} onSubmit={onClose} submitButton="Got it">
      <Block margin="xxl" />
      <Block align="center" margin="md">
=======
    <Dialog showDialog={showDialog} onClose={onClose} dialogButtons={submitButtons}>
      <Block align="center">
>>>>>>> dialogs refactoring
        <Img src={icon} alt="Alert icon" />
      </Block>
      <Block margin="md">
        <Typography variant="h4" align="center">
          {title}
        </Typography>
      </Block>
      <Typography align="center" weight="light" variant="h6">
        {children}
      </Typography>
    </Dialog>
  );
};

export const Alert = withStyles(styles)(AlertDialog);