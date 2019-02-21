import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import classNames from "classnames";
import * as React from "react";
import Block from "~/components/layout/Block";
import Img from "~/components/layout/Image";
import Typography from "~/components/layout/Typography";
import sortDown from "~/routes/transactions/assets/sortDown.svg";
import sortDownActive from "~/routes/transactions/assets/sortDownActive.svg";
import sortUp from "~/routes/transactions/assets/sortUp.svg";
import sortUpActive from "~/routes/transactions/assets/sortUpActive.svg";
import {
  calculateOppositeOrder,
  ORDER_ASC,
  ORDER_DESC,
  SortingStateProps,
  TxsOrder,
} from "~/routes/transactions/components/sorting";

const styles = createStyles({
  header: {
    display: "flex",
    alignItems: "center",
    flex: "1 0 10px",
    cursor: "pointer",
  },
  alignRight: {
    justifyContent: "flex-end",
  },
  sorting: {
    display: "flex",
    flexDirection: "column",
  },
});

interface Props extends SortingStateProps, WithStyles<typeof styles> {
  readonly name: TxsOrder;
  readonly alignRight?: boolean;
  readonly disableOrder?: boolean;
}

const ColumnHeaderDesktop = ({
  classes,
  name,
  order,
  orderBy,
  alignRight,
  disableOrder = false,
  onSort,
}: Props) => {
  const headerClasses = classNames(classes.header, { [classes.alignRight]: alignRight });
  const sortOrder = orderBy === name ? order : undefined;
  const onClickOrder = disableOrder ? undefined : onSort(name, calculateOppositeOrder(order));

  return (
    <Block className={headerClasses} onClick={onClickOrder}>
      {!disableOrder && (
        <Block className={classes.sorting} padding="sm">
          <Img src={sortOrder === ORDER_ASC ? sortUpActive : sortUp} alt="Descending sort" />
          <Block margin="xs" />
          <Img src={sortOrder === ORDER_DESC ? sortDownActive : sortDown} alt="Ascending sort" />
        </Block>
      )}
      <Typography variant="subtitle2" weight="semibold">
        {name}
      </Typography>
    </Block>
  );
};

export default withStyles(styles)(ColumnHeaderDesktop);
