import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import classNames from "classnames";
import * as React from "react";
import Block from "~/components/layout/Block";
import Img from "~/components/layout/Image";
import Typography from "~/components/layout/Typography";
import sortDown from "../../assets/sortDown.svg";
import sortDownActive from "../../assets/sortDownActive.svg";
import sortUp from "../../assets/sortUp.svg";
import sortUpActive from "../../assets/sortUpActive.svg";
import { ORDER_ASC, ORDER_DESC, SortingStateProps, SortOrder, TxsOrder } from "../sorting";

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
  readonly direction: SortOrder;
  readonly alignRight?: boolean;
}

const ColumnHeader = ({ classes, name, direction, alignRight, onSort }: Props) => {
  const headerClasses = classNames(classes.header, { [classes.alignRight]: alignRight });
  const oppositeOrder = direction ? direction : calculateOppositeFrom(direction); // This method should live in sort.ts

  return (
    <Block className={headerClasses} onClick={onSort(name, oppositeOrder)}>
      <Block className={classes.sorting} padding="sm">
        <Img src={direction === ORDER_ASC ? sortUpActive : sortUp} alt="Descending sort" />
        <Block margin="xs" />
        <Img src={direction === ORDER_DESC ? sortDownActive : sortDown} alt="Ascending sort" />
      </Block>
      <Typography variant="subtitle2" weight="semibold">
        {name}
      </Typography>
    </Block>
  );
};

export default withStyles(styles)(ColumnHeader);
