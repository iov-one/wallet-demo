import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import React from "react";
import BadgeIcon from "~/components/layout/BadgeIcon";
import Block from "~/components/layout/Block";
import Link from "~/components/layout/Link";
import Spacer from "~/components/layout/Spacer";
import Typography from "~/components/layout/Typography";
import { background, lg } from "~/theme/variables";
import CheckIcon from "../assets/check.svg";
import ImgBg from "../assets/icon_bg.svg";

const styles = createStyles({
  container: {
    display: "flex",
  },
  card: {
    backgroundColor: background,
    display: "flex",
    padding: lg,
    alignItems: "center",
    width: "100%",
    maxWidth: "506px",
  },
  info: {
    flexGrow: 1,
    display: "flex",
    flexWrap: "wrap",
  },
  titleBox: {
    flexGrow: 1,
    minWidth: "30px",
  },
});

interface Props extends WithStyles<typeof styles> {
  readonly title: string;
  readonly linkText: string;
  readonly link: string;
  readonly icon: string;
}

const SecurityCard = ({ title, icon, linkText, link, classes }: Props): JSX.Element => (
  <Block className={classes.container} margin="md">
    <Spacer order={1} />
    <Block maxWidth={506} className={classes.card}>
      <BadgeIcon icon={icon} badgeIcon={CheckIcon} width={42} height={42} background={`url(${ImgBg})`} />
      <Block className={classes.info} padding="lg">
        <Block className={classes.titleBox}>
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
    </Block>
    <Spacer order={1} />
  </Block>
);

export default withStyles(styles)(SecurityCard);
