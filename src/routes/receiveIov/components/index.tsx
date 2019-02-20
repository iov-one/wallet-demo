import { createStyles, Paper, Typography, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import { ConfirmInput, TooltipDescription } from "~/components/compoundComponents/form";
import Block from "~/components/layout/Block";
import { primary, xl, xxl } from "~/theme/variables";

const styles = createStyles({
  container: {
    display: "flex",
    justifyContent: "center",
  },
  wrapper: {
    flexBasis: "506px",
    maxWidth: "506px",
    alignSelf: "center",
    marginTop: "32px",
  },
  actionWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "23px",
  },
  modalPaper: {
    flexBasis: "506px",
    paddingBottom: xxl,
  },
  mainText: {
    marginBottom: xl,
    component: "h2",
  },
  highlight: {
    color: primary,
  },
});

interface Props extends WithStyles<typeof styles> {
  readonly iovAddress: string;
}

class ReceiveIov extends React.Component<Props> {
  public render(): JSX.Element {
    const { iovAddress, classes } = this.props;
    return (
      <Block className={classes.container}>
          <Paper className={classes.modalPaper}>
            <Typography className={classes.mainText}>
              Receive payment from <b className={classes.highlight}>IOV wallet users</b> by giving them your
              IOV address
            </Typography>
            <ConfirmInput
              title="Your IOV Address"
              value={iovAddress}
              notification="IOV Address copied to clipboard"
            />
            <div className={classes.actionWrapper}>
              <TooltipDescription
                reversed
                label="How it works"
                info="Receive payments from anyone with an IOV wallet. Give them your IOV username and the funds will get send directly to your wallet"
              />
            </div>
          </Paper>
      </Block>
    );
  }
}

export default withStyles(styles)(ReceiveIov);
