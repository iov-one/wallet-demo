import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import Typography from "~/components/layout/Typography";
import { BALANCE_ROUTE, PAYMENT_ROUTE } from "~/routes";
import { history } from "~/store";
import { lg, primary } from "~/theme/variables";

const styles = createStyles({
  root: {
    display: "flex",
  },
  text: {
    marginTop: "12px",
  },
  item: {
    margin: `0px ${lg}`,
    "&:hover": {
      cursor: "pointer",
      "& $line": {
        visibility: "visible",
      },
    },
  },
  line: {
    visibility: "hidden",
    height: "4px",
    backgroundColor: primary,
    borderRadius: "4px",
    marginTop: "4px",
  },
});

interface Props extends WithStyles<typeof styles> {}

const onBalance = () => {
  history.push(BALANCE_ROUTE);
};

const onPayments = () => {
  history.push(PAYMENT_ROUTE);
};

const Links = ({ classes }: Props) => (
  <Block className={classes.root}>
    <Block className={classes.item}>
      <Block className={classes.text}>
        <Typography variant="subtitle2" color="textPrimary" className={classes.text} onClick={onBalance}>
          Balance
        </Typography>
      </Block>
      <Block className={classes.line} />
    </Block>
    <Block className={classes.item}>
      <Block className={classes.text}>
        <Typography variant="subtitle2" color="textPrimary" className={classes.text} onClick={onPayments}>
          Payments
        </Typography>
      </Block>
      <Block className={classes.line} />
    </Block>
  </Block>
);

export default withStyles(styles)(Links);
