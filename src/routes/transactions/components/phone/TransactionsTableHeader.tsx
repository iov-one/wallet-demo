import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import Hairline from "~/components/layout/Hairline";
import Img from "~/components/layout/Image";
import Spacer from "~/components/layout/Spacer";
import Typography from "~/components/layout/Typography";
import { background, md } from "~/theme/variables";
import sorting from "../../assets/sorting.svg";

const styles = createStyles({
  panel: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: background,
  },
  column: {
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    alignItems: "center",
    margin: `${md} 0`,
  },
});

interface Props extends WithStyles<typeof styles> {}

const TransactionsTableHeader = ({ classes }: Props) => (
  <React.Fragment>
    <Block padding="lg" className={classes.header}>
      <Typography variant="subtitle2" weight="semibold">
        Transactions
      </Typography>
      <Spacer order={1} />
      <Img src={sorting} width={24} height={24} alt="Sorting" />
    </Block>
    <Hairline />
  </React.Fragment>
);

export default withStyles(styles)(TransactionsTableHeader);
