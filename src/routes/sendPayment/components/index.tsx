import { BcpCoin } from "@iov/bcp-types";
import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import { FormState } from "final-form";
import * as React from "react";
import Form from "~/components/forms/Form";
import Block from "~/components/layout/Block";
import Typography from "~/components/layout/Typography";
import { background } from "~/theme/variables";
import Controls from "./Controls"
import SendCard from "./SendCard"

interface Props extends WithStyles<typeof styles>{
  readonly onSubmit: (values: object) => Promise<void>;
  readonly validation?: (values: object) => object | Promise<object>;
  readonly balances: ReadonlyArray<BcpCoin>;
  readonly balanceTickers: ReadonlyArray<string>;
  readonly defaultTicker: string;
}

const subscription = {
  valid: true,
  submitting: true,
  validating: true,
};

const styles = createStyles({
  card: {
    backgroundColor: background,
    display: 'flex',
    flexDirection: 'column',
  },
  controls: {

  }
})

const SendPaymentLayout = ({ classes, onSubmit, validation }: Props) => (
  <Form onSubmit={onSubmit} subscription={subscription} validation={validation} fullWidth>
    {({ valid, submitting, validating }: FormState) => (
      <React.Fragment>
        <Block margin="xxl" />
        <Typography variant="body1" align="center">
          Payment Info
        </Typography>
        <Block padding="lg" margin="lg" className={classes.card}>
          <SendCard />
        </Block>
        <Controls valid={valid} submitting={submitting} validating={validating} />
      </React.Fragment>
    )}
  </Form>
);

export default withStyles(styles)(SendPaymentLayout);
