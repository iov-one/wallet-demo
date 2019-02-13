import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import Hairline from "~/components/layout/Hairline";
import Img from "~/components/layout/Image";
import Spacer from "~/components/layout/Spacer";
import Typography from "~/components/layout/Typography";
import { background, md } from "~/theme/variables";
import sorting from "../assets/sorting.svg";

const styles = createStyles({
  panel: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: background,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    margin: `${md} 0`,
  },
  header: {
    display: "flex",
    alignItems: "center",
  },
  row: {},
});

interface Props extends WithStyles<typeof styles> {}

const TransactionsTable = ({ classes }: Props): JSX.Element => {
  return (
    <React.Fragment>
      <Block margin="lg" />
      <Block className={classes.panel}>
        <Block padding="lg" className={classes.column}>
          <Block className={classes.header}>
            <Typography variant="subtitle2" weight="semibold">
              Transactions
            </Typography>
            <Spacer order={1} />
            <Img src={sorting} width={24} height={24} alt="Sorting" />
          </Block>
          <Block className={classes.row}>
            <Typography variant="subtitle2" weight="semibold">
              Transactions
            </Typography>
            <Spacer order={1} />
            <Img src={sorting} width={24} height={24} alt="Sorting" />
          </Block>
        </Block>
        <Hairline />
      </Block>
    </React.Fragment>
  );
};

export default withStyles(styles)(TransactionsTable);
