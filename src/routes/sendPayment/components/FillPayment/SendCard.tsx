import { BcpCoin } from "@iov/bcp-types";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";
import Field from "~/components/forms/Field";
import SelectField from "~/components/forms/SelectField";
import TextField from "~/components/forms/TextField";
import {
  composeValidators,
  greaterThan,
  lengthLowerThan,
  lowerThan,
  mustBeFloat,
  required,
} from "~/components/forms/validator";
import Block from "~/components/layout/Block";
import Hairline from "~/components/layout/Hairline";
import IovTypography from "~/components/layout/Typography";
import { amountToNumber, makeAmount } from "~/logic";

export const AMOUNT_FIELD = "amount";
export const RECIPIENT_FIELD = "recipient";
export const TOKEN_FIELD = "token";
export const NOTE_FIELD = "note";

const NOT_MAX_SIZE = 150;

export interface SendBalance {
  readonly balance: BcpCoin;
  readonly tickersWithBalance: ReadonlyArray<string>;
  readonly defaultTicket: string;
  readonly onUpdateBalanceToSend: (ticker: string) => void;
}

interface State {
  readonly phoneHook: HTMLDivElement | null;
}

interface Props extends SendBalance, WithStyles<typeof styles> {}

const styles = createStyles({
  container: {
    display: "flex",
    flexWrap: "nowrap",
    alignItems: "baseline",
  },
  amountField: {
    "& * input": {
      textAlign: "right",
    },
  },
  balance: {
    marginRight: "100px",
  },
});

class SendCard extends React.Component<Props, State> {
  public readonly state = {
    phoneHook: null,
  };
  private readonly phoneHookRef = React.createRef<HTMLDivElement>();

  public componentDidMount(): void {
    this.setState(() => ({
      phoneHook: this.phoneHookRef.current,
    }));
  }

  public render(): JSX.Element {
    const {
      classes,
      balance: { quantity, fractionalDigits, tokenTicker },
      tickersWithBalance,
      defaultTicket,
      onUpdateBalanceToSend,
    } = this.props;

    const crypto = amountToNumber(makeAmount(quantity, fractionalDigits, tokenTicker));
    return (
      <React.Fragment>
        <Block margin="xxl" />
        <Field
          variant="outlined"
          name={RECIPIENT_FIELD}
          type="text"
          fullWidth
          component={TextField}
          validate={required}
          placeholder="Recipient address"
        />
        <Block margin="sm" />
        <Hairline margin="lg" />
        <Block margin="md">
          <IovTypography variant="body2">Amount of tokens to send</IovTypography>
        </Block>
        <Block margin="xs" className={classes.balance}>
          <IovTypography
            align="right"
            variant="body2"
            color="primary"
            noWrap
          >{`Actual balance ${crypto} ${tokenTicker}`}</IovTypography>
        </Block>
        <Block className={classes.container}>
          <Field
            variant="outlined"
            className={classes.amountField}
            name={AMOUNT_FIELD}
            type="text"
            fullWidth
            InputProps={{ disableUnderline: true }}
            component={TextField}
            validate={composeValidators(required, mustBeFloat, greaterThan(0.000000001), lowerThan(crypto))}
            placeholder="0.00"
          />
          <Block padding="sm" />
          <Field
            name={TOKEN_FIELD}
            phoneHook={this.state.phoneHook}
            component={SelectField}
            align="right"
            items={tickersWithBalance}
            initial={defaultTicket}
            onChangeCallback={onUpdateBalanceToSend}
            width={67}
          />
        </Block>
        <Block margin="xs" />
        <div ref={this.phoneHookRef} />
        <Hairline margin="lg" />
        <Block margin="sm">
          <IovTypography variant="body2">Optional note</IovTypography>
        </Block>
        <Field
          variant="outlined"
          name={NOTE_FIELD}
          type="text"
          multiline
          fullWidth
          component={TextField}
          validate={lengthLowerThan(NOT_MAX_SIZE)}
          placeholder="Note"
        />
        <Block margin="xxl" />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(SendCard);
