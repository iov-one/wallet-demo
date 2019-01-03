import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import MuiDialogContent from "@material-ui/core/DialogContent";
import * as React from "react";
import Block from "~/components/layout/Block";
import { background, border, xl, xxl } from "~/theme/variables";

const styles = createStyles({
  dialogContent: {
    background: background,
    boxShadow: "0 0 14px 0 #edeff4",
    borderRadius: "5px",
    padding: `${xxl} ${xl}`,
    border: `1px solid ${border}`,
    overflowY: "auto",
    flexGrow: 1,
  },
});

interface Props extends WithStyles<typeof styles> {
  readonly children: React.ReactNode;
}

const DialogContent = ({ children, classes }: Props): JSX.Element => (
  <MuiDialogContent>
    <Block className={classes.dialogContent}>{children}</Block>
  </MuiDialogContent>
);

export default withStyles(styles)(DialogContent);
