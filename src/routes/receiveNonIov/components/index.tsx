import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import { ConfirmInput } from "~/components/compoundComponents/form";
import Field from "~/components/forms/Field";
import Form from "~/components/forms/Form";
import SelectField from "~/components/forms/SelectField";
import Block from "~/components/layout/Block";
import Tooltip from "~/components/layout/dialogs/Tooltip";
import Typography from "~/components/layout/Typography";
import { background, card, primary } from "~/theme/variables";
import { TickerWithAddress } from "../container/selector";

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

export const TOKEN_FIELD = "token";
const INITIAL_TOKEN = "IOV";

interface Props extends WithStyles<typeof styles> {
  readonly tickersList: ReadonlyArray<TickerWithAddress>;
}

interface RecieveNonIOVState {
  readonly ticker: TickerWithAddress;
  readonly phoneHook: HTMLDivElement | null;
  readonly howItWorksHook: HTMLDivElement | null;
}

class ReceiveNonIov extends React.Component<Props, RecieveNonIOVState> {
  private readonly phoneHookRef = React.createRef<HTMLDivElement>();
  private readonly howItWorksHookRef = React.createRef<HTMLDivElement>();
  constructor(props: Props) {
    super(props);

    const defaultTicker = this.props.tickersList.find(item => item.name === INITIAL_TOKEN);

    this.state = {
      ticker: defaultTicker ? defaultTicker : this.props.tickersList[0],
      phoneHook: null,
      howItWorksHook: null,
    };
  }

  public componentDidMount(): void {
    this.setState(() => ({
      phoneHook: this.phoneHookRef.current,
    }));
  }

  public readonly onChangeAddress = (ticker: TickerWithAddress): void => {
    this.setState({
      ticker,
      howItWorksHook: this.howItWorksHookRef.current,
    });
  };

  public readonly onSubmit = async (_: object): Promise<void> => {
    return;
  };

  public render(): JSX.Element {
    const { tickersList, classes } = this.props;
    const { ticker } = this.state;

    return (
      <Form onSubmit={this.onSubmit} fullWidth>
        {() => (
          <React.Fragment>
            <Block padding="lg" margin="lg" />
            <Block className={classes.container}>
              <Block padding="lg" margin="lg" className={classes.card}>
                <Block margin="xl" />
                <Typography variant="title" weight="light">
                  Receive payment from <b className={classes.highlight}>non-IOV users</b> by giving them this
                  address
                </Typography>
                <Block margin="xl" />
                <Field
                  name={TOKEN_FIELD}
                  phoneHook={this.state.phoneHook}
                  component={SelectField}
                  items={tickersList}
                  initial={INITIAL_TOKEN}
                  onChangeCallback={this.onChangeAddress}
                  width={100}
                />
                <Block margin="md" />
                <ConfirmInput
                  title={`Your ${ticker.name} Address`}
                  value={ticker.address}
                  notification={`${ticker.name} Address copied to clipboard`}
                />
                <Block margin="lg" />
                <Block margin="sm" className={classes.tooltip}>
                  <Typography inline variant="body2">
                    How it works
                  </Typography>
                  <Block padding="xs" />
                  <Tooltip phoneHook={this.state.howItWorksHook}>
                    <Typography variant="body2">
                      Receive payments from anyone with an IOV wallet. Give them your IOV username and the
                      funds will get send directly to your wallet
                    </Typography>
                  </Tooltip>
                </Block>
                <Block margin="xl" />
              </Block>
            </Block>
          </React.Fragment>
        )}
      </Form>
    );
  }
}

export default withStyles(styles)(ReceiveNonIov);
