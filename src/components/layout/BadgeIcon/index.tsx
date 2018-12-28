import { Badge, createStyles, PropTypes, withStyles, WithStyles } from "@material-ui/core";
import React, { PureComponent } from "react";
import Img from "~/components/layout/Image";
import { xxl } from "~/theme/variables";
import CheckIcon from "./assets/check.svg";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement>, WithStyles<typeof styles> {
  readonly icon: string;
  readonly badge: "dot" | "check";
  readonly invisible: boolean;
  readonly color?: PropTypes.Color | "error";
}

const styles = createStyles({
  background: {
    backgroundColor: "#d6faf4",
    height: xxl,
    width: xxl,
    borderRadius: xxl,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
<<<<<<< HEAD
  check: {
    width: "29px",
    top: "-8px",
    right: "-8px",
  },
  dot: {
    width: "7px",
    height: "7px",
    top: "-7px",
    right: "-7px",
=======
  badge: {
    width: "29px",
    top: "-8px",
    right: "-8px",
>>>>>>> all changes from old branch
  },
});

class BadgeIcon extends PureComponent<Props> {
  public render(): JSX.Element {
<<<<<<< HEAD
    const { icon, badge, invisible, color = "primary", classes, ...rest } = this.props;
=======
    const { icon, badge, classes, ...rest } = this.props;
    const badgeClasses = { badge: classes.badge };
>>>>>>> all changes from old branch

    const badgeClasses = { badge: badge === "check" ? classes.check : classes.dot };
    const badgeContent = badge === "check" ? <Img src={CheckIcon} alt="Badge Icon" /> : "";
    const content =
      badge === "check" ? (
        <div className={classes.background}>
          <Img src={icon} alt="Icon" {...rest} />
        </div>
      ) : (
        <Img src={icon} alt="Icon" {...rest} />
      );

    return (
      <Badge badgeContent={badgeContent} classes={badgeClasses} invisible={invisible} color={color}>
        {content}
      </Badge>
    );
  }
}

export default withStyles(styles)(BadgeIcon);
