import Typography from "@material-ui/core/Typography";
import React from "react";
import Block from "~/components/layout/Block";
import Img from "~/components/layout/Image";
import Dialog from "./dialog";

interface Props {
  readonly icon: string;
  readonly title: string;
  readonly showDialog: boolean;
  readonly onClose: () => void;
  readonly children: React.ReactNode;
}

export const Alert = ({ icon, title, showDialog, onClose, children }: Props): JSX.Element => {
  return (
    <Dialog showDialog={showDialog} onClose={onClose} onSubmit={onClose} submitButton="Got it">
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
