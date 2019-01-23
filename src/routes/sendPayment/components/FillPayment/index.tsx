import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import { FormState } from "final-form";
import * as React from "react";
import Form from "~/components/forms/Form";
import Block from "~/components/layout/Block";
import Typography from "~/components/layout/Typography";
import PageMenuColumn from "~/components/pages/PageMenuColumn";
import Controls from "~/routes/sendPayment/components/Controls";
import { background } from "~/theme/variables";
import SendCard, { SendBalance } from "./SendCard";

interface Props extends SendBalance, WithStyles<typeof styles> {
  readonly onSubmit: (values: object) => Promise<void>;
  readonly validation?: (values: object) => object | Promise<object>;
  readonly initialValues?: object;
}

const subscription = {
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
  initialValues,
  balance,
  tickersWithBalance,
  defaultTicker,
  onUpdateBalanceToSend,
}: Props) => (
  <PageMenuColumn phoneFullWidth>
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      subscription={subscription}
      validation={validation}
      fullWidth
    >
      {({ submitting, validating }: FormState) => (
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
              defaultTicker={defaultTicker}
              onUpdateBalanceToSend={onUpdateBalanceToSend}
            />
          </Block>
          <Controls submitting={submitting} validating={validating} />
        </React.Fragment>
      )}
    </Form>
  </PageMenuColumn>
);

export default withStyles(styles)(SendPaymentLayout);
