import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import Grid from "~/components/layout/Grid";
import GridItem from "~/components/layout/GridItem";
import Typography from "~/components/layout/Typography";
import { ProcessedTx } from "~/store/notifications/state";
import { getAddressPrefix } from "../common";

const styles = createStyles({
  details: {
    paddingLeft: 60,
  },
  sectionName: {
    overflowWrap: "break-word",
  },
});

interface Props extends WithStyles<typeof styles> {
  readonly tx: ProcessedTx;
}

const TransactionDetails = ({ classes, tx }: Props) => (
  <Block className={classes.details}>
    <Block margin="lg" />
    <Grid>
      <GridItem xs={12} sm={6}>
        <Block>
          <Typography variant="subtitle2" weight="regular" gutterBottom>
            {getAddressPrefix(tx)} address:
          </Typography>
          <Typography
            variant="subtitle2"
            weight="regular"
            color="textSecondary"
            className={classes.sectionName}
          >
            {tx.received ? tx.signer : tx.recipient}
          </Typography>
          <Block margin="md" />
        </Block>
      </GridItem>
      <GridItem xs={12} sm={6}>
        <Block>
          <Typography variant="subtitle2" weight="regular" gutterBottom>
            Note:
          </Typography>
          <Typography variant="subtitle2" weight="regular" color="textSecondary">
            {tx.memo ? tx.memo : "No note"}
          </Typography>
        </Block>
      </GridItem>
    </Grid>
  </Block>
);

export default withStyles(styles)(TransactionDetails);
