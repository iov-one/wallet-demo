import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import Hairline from "~/components/layout/Hairline";
import Spacer from "~/components/layout/Spacer";
import Typography from "~/components/layout/Typography";
import { SortingStateProps } from "~/routes/transactions/components/sorting";
import SortMenu, { buildNameFrom } from "./utils/SortMenuPhone";

const styles = createStyles({
  header: {
    display: "flex",
    alignItems: "center",
  },
});

interface Props extends SortingStateProps, WithStyles<typeof styles> {
  readonly phoneHook: HTMLDivElement | null;
}

const TxTableHeaderPhone = ({ classes, orderBy, order, onSort, phoneHook }: Props) => {
  const initialName = buildNameFrom(orderBy, order);
  return (
    <React.Fragment>
      <Block margin="md" />
      <Block padding="lg" className={classes.header}>
        <Typography variant="subtitle2" weight="semibold">
          Transactions
        </Typography>
        <Spacer order={1} />
        <SortMenu
          initialItem={initialName}
          orderBy={orderBy}
          order={order}
          onSort={onSort}
          phoneHook={phoneHook}
        />
      </Block>
      <Block margin="md" />
      <Hairline />
    </React.Fragment>
  );
};

export default withStyles(styles)(TxTableHeaderPhone);
