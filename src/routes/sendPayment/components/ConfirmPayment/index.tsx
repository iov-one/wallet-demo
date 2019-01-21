import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import Typography from "~/components/layout/Typography";
import PageMenuColumn from "~/components/pages/PageMenuColumn";
import Controls from "~/routes/sendPayment/components/Controls";
import { background } from "~/theme/variables";
import ConfirmCard, { Payment } from "./ConfirmCard";

interface Props extends WithStyles<typeof styles> {
  readonly payment: Payment;
  readonly onContinue: () => void;
}

const styles = createStyles({
  container: {
    width: "100%",
    minHeight: 0,
  },
  card: {
    backgroundColor: background,
    display: "flex",
    flexDirection: "column",
  },
});

class ConfirmPayment extends React.Component<Props> {
  public render(): JSX.Element {
    const { payment, classes, onContinue } = this.props;

    return (
      <PageMenuColumn phoneFullWidth>
        <Block className={classes.container}>
          <Block margin="xxl" />
          <Typography variant="body1" align="center">
            Payment Confirmation
          </Typography>
          <Block margin="md" />
          <Block padding="lg" margin="lg" className={classes.card}>
            <ConfirmCard payment={payment} />
          </Block>
          <Controls onContinue={onContinue} submitting={false} validating={false} />
        </Block>
      </PageMenuColumn>
    );
  }
}

export default withStyles(styles)(ConfirmPayment);
