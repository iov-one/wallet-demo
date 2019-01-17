import { BcpCoin } from "@iov/bcp-types";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";
import Field from "~/components/forms/Field";
import SelectField from "~/components/forms/SelectField";
import TextField from "~/components/forms/TextField";
import { required } from "~/components/forms/validator";
import Block from "~/components/layout/Block";
import Hairline from "~/components/layout/Hairline";
import IovTypography from "~/components/layout/Typography";

const RECIPIENT_FIELD = "recipient";

export interface SendBalance {
  readonly balance: BcpCoin;
  readonly tickersWithBalance: ReadonlyArray<string>;
  readonly defaultTicket: string;
  readonly onUpdateBalanceToSend: (ticker: string) => void;
}

interface State {
  readonly phoneHook: HTMLDivElement | null;
}

interface Props extends SendBalance, WithStyles<typeof styles> { }

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
    const { classes, balance, tickersWithBalance, defaultTicket, onUpdateBalanceToSend } = this.props;

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
        <Hairline margin="md" />
        <Block margin="sm">
          <IovTypography variant="body2">Amount of tokens to send</IovTypography>
        </Block>
        <Block className={classes.container}>
          <Field
            className={classes.amountField}
            name="amount"
            type="text"
            fullWidth
            InputProps={{ disableUnderline: true }}
            component={TextField}
            validate={required}
            placeholder="0,00"
          />
          <Block padding="sm" />
          <Field
            name="token"
            phone={true}
            phoneHook={this.state.phoneHook}
            component={SelectField}
            align="right"
            items={tickersWithBalance}
            initial={defaultTicket}
            onChangeCallback={onUpdateBalanceToSend}
            width={65}
          />
        </Block>
        <Block margin="xs" />
        <div ref={this.phoneHookRef} />
        <Block margin="md" />
        <Hairline margin="md" />
        <Field
          variant="outlined"
          name="note"
          type="text"
          multiline
          fullWidth
          component={TextField}
          validate={required}
          placeholder="Optional note"
        />
        <Block margin="xxl" />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(SendCard);
