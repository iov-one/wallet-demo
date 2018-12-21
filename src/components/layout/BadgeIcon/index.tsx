import { Badge, createStyles, withStyles, WithStyles } from "@material-ui/core";
import React, { PureComponent } from "react";
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

    /*
    Unfortunately it is not possible to use Block instead of div
    there is background (based on current wireframe design) used and therefor 
    it is required to setup width, height and background for the element.
    This was done by previous developer. It is possible to fix this by merging background
    image and image on it ("lock" for example). This approach will let not to use background 
    at all and "div" or "Block" too. 

    Also it is not possible to set "width" and "height" using Badge props and "Block" element.
    There is "component" props used to create wrapper for main image, but again 
    it is not possible to use "Block" inside it because block doesn't support "width", 
    "height" and "background".
    */
    return (
      <Badge
        badgeContent={<Img src={badgeIcon} alt="Badge Icon" />}
        color="primary"
      >
        <div className={classes.badgeImage} style={style}>
          <Img src={icon} alt="Icon" />
        </div>
      </Badge>
    );
  }
}

export default withStyles(styles)(BadgeIcon);
