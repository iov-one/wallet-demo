import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import classNames from "classnames";
import * as React from "react";
import Block from "~/components/layout/Block";
import Typography from "~/components/layout/Typography";

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
});

interface Props extends WithStyles<typeof styles> {
  readonly name: "Amount";
  readonly alignRight?: boolean;
}

const ColumnHeaderDesktop = ({ classes, name, alignRight }: Props) => {
  const headerClasses = classNames(classes.header, { [classes.alignRight]: alignRight });

  return (
    <Block className={headerClasses}>
      <Typography variant="subtitle2" weight="semibold">
        {name}
      </Typography>
    </Block>
  );
};

export default withStyles(styles)(ColumnHeaderDesktop);
