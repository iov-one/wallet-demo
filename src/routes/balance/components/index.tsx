import { BcpCoin } from "@iov/bcp-types";
import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import GridItem, { Order } from "~/components/layout/GridItem";
import Hairline from "~/components/layout/Hairline";
import Img from "~/components/layout/Image";
import Typography from "~/components/layout/Typography";
import { coinToString } from "~/logic";
import receive from "~/routes/balance/assets/transactionReceive.svg";
import send from "~/routes/balance/assets/transactionSend.svg";
import { background, lg, md } from "~/theme/variables";

interface Props extends WithStyles<typeof styles> {
  readonly name: string;
  readonly tokens: ReadonlyArray<BcpCoin>;
}

const styles = createStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  separator: {
    flexShrink: 1,
    flexBasis: md,
  },
  info: {
    padding: lg,
    backgroundColor: background,
    height: "unset",
  },
  actions: {
    flexBasis: "90px",
    alignItems: "center",
    justifyContent: "center",
    height: "unset",
  },
  action: {
    backgroundColor: background,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "217px",
    height: "90px",
    justifyContent: "center",
  },
});

interface CardProps {
  readonly text: string;
  readonly logo: string;
  readonly className: string;
}

const Card = ({ text, logo, className }: CardProps) => (
  <Block className={className}>
    <Img src={logo} height={36} width={36} alt={text} />
    <Typography>{text}</Typography>
  </Block>
);

const BalanceLayout = ({ classes, name, tokens }: Props) => {
  const actions: Order = { xs: 1, sm: 0 };
  const info: Order = { xs: 0, sm: 1 };

  return (
    <Block className={classes.root}>
      <GridItem order={actions} className={classes.actions} margin="lg">
        <Card text="Send payment" logo={send} className={classes.action} />
        <Block className={classes.separator} />
        <Card text="Reeive Payment" logo={receive} className={classes.action} />
      </GridItem>
      <GridItem order={info} variant="column" className={classes.info}>
        <Block margin="md" />
        <Typography variant="h5" align="center" weight="light">{name}</Typography>
        <Hairline margin="xl" />
        <Typography variant="subtitle2" align="center">Your currencies</Typography>
        <Block margin="lg" />
        {tokens.map((token: BcpCoin) => (
          <Typography underlined variant="h6" weight="regular" color="primary" align="center">
            {`${coinToString(token)} ${token.tokenTicker}`}
          </Typography>
        ))}
        <Block margin="lg" />
      </GridItem>
    </Block>
  );
};

export default withStyles(styles)(BalanceLayout);
