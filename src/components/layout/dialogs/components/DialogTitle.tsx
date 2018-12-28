import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import Img from "~/components/layout/Image";
import CloseIcon from "../../../../../resources/close_type2.svg";

const styles = createStyles({
  closeButton: {
    position: "absolute",
    right: 6,
    top: 0,
  },
});

interface Props extends WithStyles<typeof styles> {
  readonly onClose: () => void;
}

const DialogTitle = ({ onClose, classes }: Props): JSX.Element => (
  <MuiDialogTitle disableTypography onClick={onClose}>
    <Img src={CloseIcon} alt="Close" onClick={onClose} className={classes.closeButton} />
  </MuiDialogTitle>
);

export default withStyles(styles)(DialogTitle);
