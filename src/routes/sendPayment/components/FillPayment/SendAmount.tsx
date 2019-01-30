import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";
import AmountField from "~/components/forms/AmountField";
import Field from "~/components/forms/Field";
import SelectField from "~/components/forms/SelectField";
import {
  composeValidators,
  greaterThanOrEqual,
  lowerThanOrEqual,
  mustBeFloat,
  required,
} from "~/components/forms/validator";
import Block from "~/components/layout/Block";
import CircleImage from "~/components/layout/CircleImage";
import Typography from "~/components/layout/Typography";
import { amountToNumber, makeAmount } from "~/logic";
import person from "../../assets/person.svg";
import { SendBalance } from "./index";
import SendCard from "./SendCard";

export const AMOUNT_FIELD = "amount";
export const TOKEN_FIELD = "token";

interface State {
  readonly phoneHook: HTMLDivElement | null;
  readonly errorHook: HTMLDivElement | null;
}

interface Props extends SendBalance, WithStyles<typeof styles> {}

const styles = createStyles({
  container: {
    display: "flex",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
  amountField: {
    flex: "1 0 100px",
  },
  tickerField: {
    flex: "1 0 100px",
  },
  tickersList: {
    width: "100%",
  },
  balance: {
    color: "#a2a6a8",
  },
  inner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    top: -36,
  },
});

class SendAmount extends React.Component<Props, State> {
  public readonly state = {
    phoneHook: null,
    errorHook: null,
  };
  private readonly phoneHookRef = React.createRef<HTMLDivElement>();
  private readonly errorHookRef = React.createRef<HTMLDivElement>();

  public componentDidMount(): void {
    this.setState(() => ({
      phoneHook: this.phoneHookRef.current,
      errorHook: this.errorHookRef.current,
    }));
  }

  public render(): JSX.Element {
    const {
      classes,
      balance: { quantity, fractionalDigits, tokenTicker },
      tickersWithBalance,
      defaultTicker,
      onUpdateBalanceToSend,
    } = this.props;

    const crypto = amountToNumber(makeAmount(quantity, fractionalDigits, tokenTicker));
    return (
      <SendCard>
        <Block className={classes.inner}>
          <CircleImage alt="Send Payment" dia={72} circleColor="#ffe152" icon={person} />
          <Block margin="lg" />
          <Typography variant="subtitle2">You send</Typography>
          <Block margin="lg" />
          <Block className={classes.container}>
            <Block className={classes.amountField}>
              <Field
                variant="outlined"
                name={AMOUNT_FIELD}
                type="text"
                fullWidth
                errorHook={this.state.errorHook}
                component={AmountField}
                validate={composeValidators(
                  required,
                  mustBeFloat,
                  greaterThanOrEqual(0.000000001),
                  lowerThanOrEqual(crypto),
                )}
                placeholder="0,00"
              />
            </Block>
            <Block className={classes.tickerField}>
              <Field
                name={TOKEN_FIELD}
                phoneHook={this.state.phoneHook}
                component={SelectField}
                align="left"
                items={tickersWithBalance}
                initial={defaultTicker}
                onChangeCallback={onUpdateBalanceToSend}
                width={65}
              />
            </Block>
          </Block>
          <div ref={this.phoneHookRef} className={classes.tickersList} />
          <div ref={this.errorHookRef} />

          <Block margin="xl" />
          <Typography
            className={classes.balance}
            align="right"
            variant="body2"
            weight="semibold"
            noWrap
          >{`balance: ${crypto} ${tokenTicker}`}</Typography>
          <Block margin="xs" />
        </Block>
      </SendCard>
    );
  }
}

export default withStyles(styles)(SendAmount);
