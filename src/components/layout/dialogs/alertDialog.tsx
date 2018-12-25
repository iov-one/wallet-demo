import React from "react";
import Block from "~/components/layout/Block";
import Img from "~/components/layout/Image";
import Typography from "~/components/layout/Typography";
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
