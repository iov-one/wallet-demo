import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import Dialog from "~/components/layout/Dialog";
import Block from "~/components/layout/Block";
import Img from "~/components/layout/Image";
import React, { PureComponent } from "react";
import Typography from "@material-ui/core/Typography";


const styles = createStyles({
  message: {
    fontSize: "1.2em",
  },

  iconParent: {
    textAlign: "center",
  }
});

interface Props extends WithStyles<typeof styles> {
  readonly icon: string;
  readonly title: string;
  readonly showDialog: boolean;
  readonly onClose: () => void;
  readonly children: React.ReactNode;
}

interface State {
  readonly open: boolean;
}

class AlertDialog extends PureComponent<Props, State> {
  public readonly state = {
    open: false,
  };

  public render(): JSX.Element {
    const { icon, title, showDialog, onClose, children, classes } = this.props;

    return (
      <Dialog showDialog={showDialog} onClose={onClose} onSubmit={onClose} submitButton="Got it">
        <Block className={classes.iconParent}>
          <Img src={icon} alt="Alert icon"/>
        </Block>
        <Typography gutterBottom variant="h4" align="center">
          {title}
        </Typography>
        <Typography align="center" className={classes.message}>
          {children}
        </Typography>
      </Dialog>
    );
  }
}

export default withStyles(styles)(AlertDialog);
