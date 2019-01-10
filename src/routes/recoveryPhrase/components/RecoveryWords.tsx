import * as React from "react";
import Block from "~/components/layout/Block";
import Grid from "~/components/layout/Grid";
import GridItem from "~/components/layout/GridItem";
import Typography from "~/components/layout/Typography";

export default () => (
  <React.Fragment>
    <Grid>
      <GridItem xs={6} lg={4}>
        <Block padding="xxl" margin="xxl">
          <Block margin="sm">
            <Typography variant="subtitle2" color="textPrimary">
              one
            </Typography>
          </Block>
        </Block>
      </GridItem>
      <GridItem xs={6} lg={4}>
        <Block padding="xxl" margin="xxl">
          <Block margin="sm">
            <Typography variant="subtitle2" color="textPrimary">
              two
            </Typography>
          </Block>
        </Block>
      </GridItem>
      <GridItem xs={6} lg={4}>
        <Block padding="xxl" margin="xxl">
          <Block margin="sm">
            <Typography variant="subtitle2" color="textPrimary">
              three
            </Typography>
          </Block>
        </Block>
      </GridItem>
    </Grid>
  </React.Fragment>
);
