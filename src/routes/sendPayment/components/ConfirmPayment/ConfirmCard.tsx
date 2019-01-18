import TextField from "@material-ui/core/TextField";
import * as React from "react";
import Block from "~/components/layout/Block";
import Hairline from "~/components/layout/Hairline";
import Typography from "~/components/layout/Typography";

export interface Payment {
  readonly ticker: string;
  readonly amount: string;
  readonly recipient: string;
  readonly note?: string;
}

interface Props {
  readonly payment: Payment;
}

const ConfirmCard = ({ payment: { amount, recipient, ticker, note } }: Props) => {
  const fieldInputProps = { readOnly: true, disableUnderline: true };

  return (
    <React.Fragment>
      <Block margin="xxl" />
      <Block margin="xs">
        <Typography variant="body2">You are sending</Typography>
      </Block>
      <TextField
        variant="filled"
        type="text"
        fullWidth
        value={`${amount} ${ticker}`}
        InputProps={fieldInputProps}
      />
      <Block margin="sm" />
      <Hairline margin="lg" />
      <Block margin="xs">
        <Typography variant="body2">To recipient</Typography>
      </Block>
      <TextField variant="filled" type="text" fullWidth value={recipient} InputProps={fieldInputProps} />
      <Block margin="sm" />
      <Hairline margin="lg" />
      <Typography variant="body2">Note</Typography>
      <TextField
        multiline
        type="text"
        fullWidth
        value={note ? note : "No note left"}
        InputProps={fieldInputProps}
      />
      <Block margin="xxl" />
    </React.Fragment>
  );
};

export default ConfirmCard;
