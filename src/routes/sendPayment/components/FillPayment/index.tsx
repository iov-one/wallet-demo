import { BcpCoin } from "@iov/bcp-types";
import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import { FormState } from "final-form";
import * as React from "react";
import Form from "~/components/forms/Form";
import { Item } from "~/components/forms/SelectField";
import Block from "~/components/layout/Block";
import CircleImage from "~/components/layout/CircleImage";
import Typography from "~/components/layout/Typography";
import PageMenuColumn from "~/components/pages/PageMenuColumn";
import Controls from "~/routes/sendPayment/components/Controls";
import { background } from "~/theme/variables";
import person from "../../assets/person.svg";
import SendAmount from "./SendAmount";
import SendCard from "./SendCard";

export interface SendBalance {
  readonly balance: BcpCoin;
  readonly tickersWithBalance: ReadonlyArray<Item>;
  readonly defaultTicker: string;
  readonly onUpdateBalanceToSend: (ticker: Item) => void;
}

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
    alignItems: "center",
  },
  innerBlock: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    top: -36,
  },
  icon: {
    position: "relative",
    top: -36,
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
      <Block margin="xxl" />
      <Block margin="md" />
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        subscription={subscription}
        validation={validation}
        fullWidth
      >
        {({ submitting, validating }: FormState) => (
          <React.Fragment>
            <Block padding="lg" margin="lg" className={classes.card}>
              <Block className={classes.innerBlock}>
                <CircleImage alt="Send Payment" dia={72} circleColor="#ffe152" icon={person} />
                <Block margin="lg" />
                <Typography variant="subtitle2">You send</Typography>
                <Block margin="lg" />
                <SendAmount
                  balance={balance}
                  tickersWithBalance={tickersWithBalance}
                  defaultTicker={defaultTicker}
                  onUpdateBalanceToSend={onUpdateBalanceToSend}
                />
              </Block>
            </Block>
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
