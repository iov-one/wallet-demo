import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import Field from "~/components/forms/Field";
import TextField from "~/components/forms/TextField";
import Block from "~/components/layout/Block";
import Button from "~/components/layout/Button";
import Tooltip from "~/components/layout/dialogs/Tooltip";
import Typography from "~/components/layout/Typography";
import { ToastConsumer, ToastContextInterface, ToastVariant } from "~/context/ToastProvider";
import { background, card, primary } from "~/theme/variables";

const styles = createStyles({
  container: {
    display: "flex",
    justifyContent: "center",
  },
  card: {
    backgroundColor: background,
    display: "flex",
    flexDirection: "column",
    flexBasis: card,
    maxWidth: card,
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
            <Block margin="md" />
            <Block className={classes.container} margin="md">
              <Field
                variant="outlined"
                name="copy-address"
                type="string"
                fullWidth
                component={TextField}
                placeholder={iovAddress}
              />
              <ToastConsumer>
                {({ showToast }: ToastContextInterface) => (
                  <CopyToClipboard text={iovAddress}>
                    <Button
                      onClick={() => showToast("IOV Address copied to clipboard", ToastVariant.SUCCESS)}
                      variant="contained"
                      color="primary"
                      size="large"
                    >
                      Copy!
                    </Button>
                  </CopyToClipboard>
                )}
              </ToastConsumer>
            </Block>
            <Block margin="lg" />
            <Block margin="sm" className={classes.tooltip}>
              <Typography inline variant="body2">
                How it works
              </Typography>
              <Block padding="xs" />
              <Tooltip phoneHook={this.state.howItWorksHook}>
                <Typography variant="body2">
                  Receive payments from anyone with an IOV wallet. Give them your IOV username and the funds
                  will get send directly to your wallet
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
