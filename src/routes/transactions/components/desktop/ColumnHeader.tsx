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
import { ColumnName, SortingStateProps, SortOrder } from "../../common";
import { DesktopHeaderProps } from "./TransactionsTableHeader";

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

interface Props extends DesktopHeaderProps, SortingStateProps, WithStyles<typeof styles> {
  readonly name: string;
  readonly alignRight?: boolean;
}

const ColumnHeader = ({ classes, name, alignRight, onSort, sortingState }: Props) => {
  const headerClasses = classNames(classes.header, { [classes.alignRight]: alignRight });
  const sortOrder = sortingState && name in sortingState ? sortingState[name] : SortOrder.NoOrder;

  return (
    <Block className={headerClasses} onClick={onSort(name as ColumnName)}>
      <Block className={classes.sorting} padding="sm">
        <Img src={sortOrder === SortOrder.Ascending ? sortUpActive : sortUp} alt="Descending sort" />
        <Block margin="xs" />
        <Img src={sortOrder === SortOrder.Descending ? sortDownActive : sortDown} alt="Ascending sort" />
      </Block>
      <Typography variant="subtitle2" weight="semibold">
        {name}
      </Typography>
    </Block>
  );
};

export default withStyles(styles)(ColumnHeader);
