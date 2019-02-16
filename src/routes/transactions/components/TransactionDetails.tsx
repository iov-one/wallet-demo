import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import Grid from "~/components/layout/Grid";
import GridItem from "~/components/layout/GridItem";
import Typography from "~/components/layout/Typography";

const styles = createStyles({
  details: {
    paddingLeft: 60,
  },
});

interface Props extends WithStyles<typeof styles> {
  readonly recipient: string;
  readonly note?: string;
}

const TransactionDetails = ({ classes, recipient, note }: Props) => (
  <Block className={classes.details}>
    <Block margin="lg" />
    <Grid>
      <GridItem xs={12} sm={6}>
        <Block>
          <Typography variant="subtitle2" weight="regular" gutterBottom>
            To address:
          </Typography>
          <Typography variant="subtitle2" weight="regular" color="textSecondary">
            {recipient}
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
            {note ? note : "No note"}
          </Typography>
        </Block>
      </GridItem>
    </Grid>
    <Block margin="lg" />
  </Block>
);

export default withStyles(styles)(TransactionDetails);
