import React from "react";

import { createStyles, withStyles, WithStyles, Badge } from "@material-ui/core";

import Block from "~/components/layout/Block";
import Img from "~/components/layout/Image";

import ImgBg from "../assets/icon_bg.svg";
import IconBadge from "./IconBadge";

interface Props extends WithStyles<typeof styles> {
  readonly icon: string;
  readonly badgeIcon: string;
}

const styles = createStyles({
  wrapper: {
    position: "relative",
    padding: 0,
    marginLeft: 0,
    width: 42,
    height: 42,
    backgroundImage: `url(${ImgBg})`,
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
  },
});



const IconGroup = ({ icon, badgeIcon, classes }: Props): JSX.Element => (
  <Badge
    badgeContent={<IconBadge icon={badgeIcon} />}
    color="primary">
    
    <Block className={classes.wrapper}>
      <Img src={icon} alt="Icon" />
    </Block>
  </Badge>
);

export default withStyles(styles)(IconGroup);
