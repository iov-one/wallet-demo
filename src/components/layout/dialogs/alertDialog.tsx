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
    <Dialog showDialog={showDialog} onClose={onClose} dialogButtons={submitButtons}>
      <Block align="center">
        <Img src={icon} alt="Alert icon" />
      </Block>
      <Typography gutterBottom variant="h4" align="center">
        {title}
      </Typography>
      <Typography align="center" variant="h6">
        {children}
      </Typography>
    </Dialog>
  );
};

export const Alert = withStyles(styles)(AlertDialog);