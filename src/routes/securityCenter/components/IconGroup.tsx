import React from "react";

import { createStyles, withStyles, WithStyles } from "@material-ui/core";

import Block from "~/components/layout/Block";
import Img from "~/components/layout/Image";

import ImgBg from "../assets/icon_bg.svg";

interface Props extends WithStyles<typeof styles> {
  readonly icon: string;
  readonly badgeIcon: string;
}

const styles = createStyles({
  wrapper: {
    position: "relative",
    padding: 0,
    marginLeft: 0,
    marginRight: 21,
    width: 42,
    height: 42,
    backgroundImage: `url(${ImgBg})`,
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    maxWidth: 62,
    width: 62,
    height: 62,
    top: -30,
    right: -30,
  },
});

const IconGroup = ({ icon, badgeIcon, classes }: Props): JSX.Element => (
  <Block className={classes.wrapper}>
    <Img src={icon} alt="Icon" />
    <Img className={classes.badge} src={badgeIcon} alt="Badge Icon" />
  </Block>
);

export default withStyles(styles)(IconGroup);
