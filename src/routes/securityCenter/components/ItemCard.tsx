import { Card, createStyles, withStyles, WithStyles } from "@material-ui/core";
import React from "react";
import BadgeIcon from "~/components/layout/BadgeIcon";
import Block from "~/components/layout/Block";
import Link from "~/components/layout/Link";
import Typography from "~/components/layout/Typography";
import CheckIcon from "../assets/check.svg";
import ImgBg from "../assets/icon_bg.svg";

const styles = createStyles({
  securityCard: {
    display: "flex",
    alignItems: "center",
    flex: "1 0 auto",
  },
  titleBox: {
    flexGrow: 1,
    minWidth: "30px",
  },
  card: {
    width: "100%",
  },
});

interface Props extends WithStyles<typeof styles> {
  readonly title: string;
  readonly linkText: string;
  readonly link: string;
  readonly icon: string;
}

const SecurityCard = ({ title, icon, linkText, link, classes }: Props): JSX.Element => (
  <Block margin="md" maxWidth={506} className={classes.card}>
    <Card>
      <Block margin="xl" />
      <Block padding="xl" className={classes.securityCard}>
        <Block>
          <BadgeIcon icon={icon} badgeIcon={CheckIcon} width={42} height={42} background={`url(${ImgBg})`} />
        </Block>
        <Block className={classes.titleBox} padding="lg">
          <Typography noWrap component="h6" variant="h6">
            {title}
          </Typography>
        </Block>
        <Block>
          <Link to={link}>
            <Typography noWrap underlined variant="body1" color="primary" align="right">
              {linkText}
            </Typography>
          </Link>
        </Block>
      </Block>
      <Block margin="xl" />
    </Card>
  </Block>
);

export default withStyles(styles)(SecurityCard);
