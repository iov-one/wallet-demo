import { Badge, createStyles, withStyles, WithStyles } from "@material-ui/core";
import React, { PureComponent } from "react";
import Block from "~/components/layout/Block";
import Img from "~/components/layout/Image";


const styles = createStyles({
  badgeIcon: {
    maxWidth: 62,
    width: 62,
    height: 62,
  },

  badgeImage: {
    position: "relative",
    padding: 0,
    marginLeft: 0,
    display: "flex",
    alignContent: "center",
    justifyContent: "center"
  }
});

interface Props extends WithStyles<typeof styles> {
  readonly icon: string;
  readonly badgeIcon: string;
  readonly width?: number;
  readonly height?: number;
  readonly background?: string;
}

class BadgeIcon extends PureComponent<Props> {
  public render(): JSX.Element {
    const { icon, badgeIcon, width, height, background, classes } = this.props;

    const style = {
      width: width ? width : undefined,
      height: height ? height : undefined,
      background: background ? background : undefined,
    };

    return (
      <Badge
        badgeContent={<Img className={classes.badgeIcon} src={badgeIcon} alt="Badge Icon" />}
        color="primary"
      >
        <Block className={classes.badgeImage}>
          <Img src={icon} alt="Icon" />
        </Block>
      </Badge>
    );
  }
}

export default withStyles(styles)(BadgeIcon);
