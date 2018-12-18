import React from "react";

import { createStyles, Card, withStyles, WithStyles } from "@material-ui/core";

import Block from "~/components/layout/Block";
import Grid from "~/components/layout/Grid";
import GridItem from "~/components/layout/GridItem";
import Link from "~/components/layout/Link";
import Typography from "~/components/layout/Typography";

import IconGroup from "./IconGroup";
import ImgBg from "../assets/icon_bg.svg";

import CheckIcon from "../assets/check.svg";
import BadgeIcon from "~/components/layout/BadgeIcon";

const styles = createStyles({
  card: {
    width: 504,
  },
});

interface Props extends WithStyles<typeof styles> {
  readonly title: string;
  readonly linkText: string;
  readonly link: string;
  readonly icon: string;
}

const SecurityCard = ({ title, icon, linkText, link, classes }: Props): JSX.Element => (
  <Block margin="md">
    <Card className={classes.card}>
      <Block margin="xl" />
      <Block padding="xl">
        <Grid align="center">
          <GridItem xs={8} md={9} lg={9}>
            <Grid align="center">
              <BadgeIcon 
                icon={icon} 
                badgeIcon={CheckIcon} 
                width={42}
                height={42}
                background={`url(${ImgBg})`} />
              <Block padding="lg">
                <Typography component="h6" variant="h6">
                  {title}
                </Typography>
              </Block>
            </Grid>
          </GridItem>
          <GridItem xs={4} md={3} lg={3}>
            <Link to={link}>
              <Typography underlined variant="body1" color="primary" align="right">
                {linkText}
              </Typography>
            </Link>
          </GridItem>
        </Grid>
      </Block>
      <Block margin="xl" />
    </Card>
  </Block>
);

export default withStyles(styles)(SecurityCard);
