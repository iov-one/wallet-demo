import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import { FormState } from "final-form";
import * as React from "react";
import Form from "~/components/forms/Form";
import Block from "~/components/layout/Block";
import Typography from "~/components/layout/Typography";
import PageMenuColumn from "~/components/pages/PageMenuColumn";
import { background } from "~/theme/variables";
import Controls from "./Controls";
import SendCard, { SendBalance } from "./SendCard";

interface Props extends SendBalance, WithStyles<typeof styles> {
  readonly onSubmit: (values: object) => Promise<void>;
  readonly validation?: (values: object) => object | Promise<object>;
}

const subscription = {
  valid: true,
  submitting: true,
  validating: true,
};

const styles = createStyles({
  card: {
    backgroundColor: background,
    display: "flex",
    flexDirection: "column",
  },
  controls: {},
});

const SendPaymentLayout = ({
  classes,
  onSubmit,
  validation,
  balance,
  tickersWithBalance,
  defaultTicket,
  onUpdateBalanceToSend,
}: Props) => (
  <PageMenuColumn phoneFullWidth>
    <Form onSubmit={onSubmit} subscription={subscription} validation={validation} fullWidth>
      {({ valid, submitting, validating }: FormState) => (
        <React.Fragment>
          <Block margin="xxl" />
          <Typography variant="body1" align="center">
            Payment Info
          </Typography>
          <Block margin="md" />
          <Block padding="lg" margin="lg" className={classes.card}>
            <SendCard
              balance={balance}
              tickersWithBalance={tickersWithBalance}
              defaultTicket={defaultTicket}
              onUpdateBalanceToSend={onUpdateBalanceToSend}
            />
          </Block>
          <Controls valid={valid} submitting={submitting} validating={validating} />
        </React.Fragment>
      )}
    </Form>
  </PageMenuColumn>
);

export default withStyles(styles)(SendPaymentLayout);
