import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import GridItem, { Order } from "~/components/layout/GridItem";
import Hairline from "~/components/layout/Hairline";
import Img from "~/components/layout/Image";
import Typography from "~/components/layout/Typography";
import send from "~/routes/balance/assets/transactionSend.svg";
import { lg, md } from "~/theme/variables";

interface Props extends WithStyles<typeof styles> {
  readonly name: string;
}

const styles = createStyles({
  separator: {
    flexShrink: 1,
    flexBasis: md,
  },
  info: {
    padding: lg,
  },
  action: {
    display: 'flex',
    flexDirection: 'column',
  }
});

interface CardProps {
  readonly text: string,
  readonly logo: string,
  readonly className: string,
}

const Card = ({ text, logo, className}: CardProps) => (
  <Block className={className}>
    <Img src={logo} height={36} width={36} alt={text} />
    <Typography>{text}</Typography>
  </Block>
)

const BalanceLayout = ({ classes, name }: Props) => {
  const actions: Order = { xs: 2, sm: 1 };
  const info: Order = { xs: 1, sm: 2 };

  return (
    <React.Fragment>
      <GridItem order={actions}>
        <Card text="Send payment" logo={send} className={classes.action} />
        <Block className={classes.separator} />
        <Card text="Reeive Payment" logo={send} className={classes.action} />
      </GridItem>
      <GridItem order={info} className={classes.info}>
        <Typography variant="h4">{name}</Typography>
        <Hairline />
        <Typography variant="subtitle2">Your Currencies</Typography>
      </GridItem>
    </React.Fragment>
  );
};

export default withStyles(styles)(BalanceLayout);
