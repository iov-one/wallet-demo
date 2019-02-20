import { createStyles, Paper, Typography, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import { ConfirmInput, TooltipDescription } from "~/components/compoundComponents/form";
import Field from "~/components/forms/Field";
import Form from "~/components/forms/Form";
import SelectField from "~/components/forms/SelectField";
import Block from "~/components/layout/Block";
import { primary, xl, xxl } from "~/theme/variables";
import { TickerWithAddress } from "../container/selector";

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

export const TOKEN_FIELD = "token";
const INITIAL_TOKEN = "IOV";

interface Props extends WithStyles<typeof styles> {
  readonly tickersList: ReadonlyArray<TickerWithAddress>;
}

interface RecieveNonIOVState {
  readonly ticker: TickerWithAddress;
  readonly phoneHook: HTMLDivElement | null;
}

class ReceiveNonIov extends React.Component<Props, RecieveNonIOVState> {
  private readonly phoneHookRef = React.createRef<HTMLDivElement>();
  constructor(props: Props) {
    super(props);

    const defaultTicker = this.props.tickersList.find(item => item.name === INITIAL_TOKEN);

    this.state = {
      ticker: defaultTicker ? defaultTicker : this.props.tickersList[0],
      phoneHook: null,
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
    });
  };

  public readonly onSubmit = async (_: object): Promise<void> => {
    return;
  };

  public render(): JSX.Element {
    const { tickersList, classes } = this.props;
    const { ticker } = this.state;

    return (
      <Block className={classes.container}>
        <div className={classes.wrapper}>
          <Form onSubmit={this.onSubmit} fullWidth>
            {() => (
              <Paper className={classes.modalPaper}>
                <Typography className={classes.mainText}>
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
                <Block margin="sm" />
                <div ref={this.phoneHookRef} />
                <Block margin="md" />
                <ConfirmInput
                  title={`Your ${ticker.name} Address`}
                  value={ticker.address}
                  notification={`${ticker.name} Address copied to clipboard`}
                />
                <div className={classes.actionWrapper}>
                  <TooltipDescription
                    reversed
                    label="How it works"
                    info="Have a non IOV user send you Lisk to this address and it will show up on your account"
                  />
                </div>
              </Paper>
            )}
          </Form>
        </div>
      </Block>
    );
  }
}

export default withStyles(styles)(ReceiveNonIov);
