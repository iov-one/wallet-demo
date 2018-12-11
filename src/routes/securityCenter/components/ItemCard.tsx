import React from "react";

import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import Img from "~/components/layout/Image";
import Typography from "~/components/layout/Typography";

import CheckIcon from "../assets/check.svg";

interface Props extends WithStyles<typeof styles> {
  readonly title: string;
  readonly linkText: string;
  readonly icon: string;
  readonly onClickLink: () => void;
}

const styles = createStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between",
    width: "506px",
    height: "102px",
    marginTop: "16px",
  },
  leftPart: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "flex-start",
  },
  link: {
    cursor: "pointer",
  },
  iconWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "42px",
    height: "42px",
    borderRadius: "21px",
    backgroundColor: "#31E6C920",
    marginRight: "21px",
  },
  checkIcon: {
    position: "absolute",
    right: "-34px",
    top: "-34px",
    width: "66px !important",
    height: "66px !important",
  },
});

const ItemCard = ({ title, icon, linkText, onClickLink, classes }: Props): JSX.Element => (
  <Card elevation={2} className={classes.container}>
    <CardContent className={classes.leftPart}>
      <div className={classes.iconWrapper}>
        <Img src={icon} alt="icon" />
        <Img className={classes.checkIcon} src={CheckIcon} alt="checkIcon" />
      </div>
      <Typography component="h6" variant="h6">
        {title}
      </Typography>
    </CardContent>
    <CardContent>
      <Typography className={classes.link} underlined variant="body1" color="primary" onClick={onClickLink}>
        {linkText}
      </Typography>
    </CardContent>
  </Card>
);

export const SecurityCard = withStyles(styles)(ItemCard);
