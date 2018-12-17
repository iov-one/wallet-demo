import React from "react";

import Card from "@material-ui/core/Card";

import Block from "~/components/layout/Block";
import Grid from "~/components/layout/Grid";
import GridItem from "~/components/layout/GridItem";
import Link from "~/components/layout/Link";
import Typography from "~/components/layout/Typography";

import IconGroup from "./IconGroup";

import CheckIcon from "../assets/check.svg";

interface Props {
  readonly title: string;
  readonly linkText: string;
  readonly link: string;
  readonly icon: string;
}

export const SecurityCard = ({ title, icon, linkText, link }: Props): JSX.Element => (
  <Block margin="md">
    <Card style={{ width: "504px" }}>
      <Block margin="xl" />
      <Block padding="xl">
        <Grid align="center">
          <GridItem xs={8} md={9} lg={9}>
            <Grid align="center">
              <IconGroup icon={icon} badgeIcon={CheckIcon} />
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
