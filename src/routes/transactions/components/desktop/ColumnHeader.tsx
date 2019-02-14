import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import Block from '~/components/layout/Block';
import Img from '~/components/layout/Image';
import Typography from "~/components/layout/Typography";
import sortDown from "../../assets/sortDown.svg";
import sortDownActive from "../../assets/sortDownActive.svg";
import sortUp from "../../assets/sortUp.svg";
import sortUpActive from "../../assets/sortUpActive.svg";
import classNames from 'classnames';

const styles = createStyles({
  header: {
    display: "flex",
    alignItems: "center",
    flex: "1 0 10px",
  },
  alignRight: {
    justifyContent: "flex-end",
  },
  sorting: {
    display: "flex",
    flexDirection: "column",
  }
});

interface Props extends WithStyles<typeof styles> {
  readonly name: string;
  readonly alignRight?: boolean;
}


const ColumnHeader = ({ classes, name, alignRight }: Props) => {
  const headerClasses = classNames(classes.header, {[classes.alignRight]: alignRight});

  return (
    <Block className={headerClasses}>
      <Block className={classes.sorting} padding="sm">
        <Img src={sortUp} alt="Descending sort" />
        <Block margin="xs" />
        <Img src={sortDown} alt="Ascending sort" />
      </Block>
      <Typography variant="subtitle2" weight="semibold">
        {name}
      </Typography>
    </Block>
  );
}

export default withStyles(styles)(ColumnHeader);