import { Badge, createStyles, withStyles, WithStyles } from "@material-ui/core";
import React, { PureComponent } from "react";
import Img from "~/components/layout/Image";
import { xxl } from "~/theme/variables";
import CheckIcon from "./assets/check.svg";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement>, WithStyles<typeof styles> {
  readonly icon: string;
  readonly badge: "dot" | "check";
  readonly invisible: boolean;
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
  check: {
    width: "29px",
    top: "-8px",
    right: "-8px",
  },
  dot: {
    width: "8px",
    height: "8px",
    top: "-8px",
    right: "-8px",
  },
});

class BadgeIcon extends PureComponent<Props> {
  public render(): JSX.Element {
    const { icon, badge, invisible, classes, ...rest } = this.props;

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
      <Badge badgeContent={badgeContent} classes={badgeClasses} invisible={invisible} color="primary">
        {content}
      </Badge>
    );
  }
}

export default withStyles(styles)(BadgeIcon);
