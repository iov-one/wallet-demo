import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import { ConfirmInput } from "~/components/compoundComponents/form";
import Block from "~/components/layout/Block";
import Tooltip from "~/components/layout/dialogs/Tooltip";
import Typography from "~/components/layout/Typography";
import { background, primary, xl, xxl } from "~/theme/variables";

const styles = createStyles({
  container: {
    display: "flex",
    justifyContent: "center",
  },
  card: {
    backgroundColor: background,
    display: "flex",
    flexDirection: "column",
    flexBasis: "506px",
    maxWidth: "506px",
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
    gutterBottom: xl,
    marginBottom: xl,
  },
  highlight: {
    color: primary,
  },
  tooltip: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});

interface Props extends WithStyles<typeof styles> {
  readonly iovAddress: string;
}

interface State {
  readonly howItWorksHook: HTMLDivElement | null;
}

class ReceiveIov extends React.Component<Props, State> {
  public readonly state = {
    howItWorksHook: null,
  };
  private readonly howItWorksHookRef = React.createRef<HTMLDivElement>();

  public componentDidMount(): void {
    this.setState(() => ({
      howItWorksHook: this.howItWorksHookRef.current,
    }));
  }

  public render(): JSX.Element {
    const { iovAddress, classes } = this.props;
    return (
      <React.Fragment>
        <Block padding="lg" margin="lg" />
        <Block className={classes.container}>
          <Block padding="lg" margin="lg" className={classes.card}>
            <Block margin="xl" />
            <Typography variant="title" weight="light">
              Receive payment from <b className={classes.highlight}>IOV wallet users</b> by giving them your
              IOV address
            </Typography>
            <Block margin="xl" />
            <ConfirmInput
              title="Your IOV Address"
              value={iovAddress}
              notification="IOV Address copied to clipboard"
            />
            <Block margin="lg" />
            <Block margin="sm" className={classes.tooltip}>
              <Typography inline variant="body2">
                How it works
              </Typography>
              <Block padding="xs" />
              <Tooltip phoneHook={this.state.howItWorksHook}>
                <Typography variant="body2">
                  Receive payments from anyone with an IOV wallet. Give them your IOV username and the funds will get send directly to your wallet
                </Typography>
              </Tooltip>
            </Block>
            <Block margin="xl" />
          </Block>
        </Block>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ReceiveIov);
