import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import classNames from "classnames";
import * as React from "react";
import Img, { ImgProps } from "~/components/layout/Image";

const styles = createStyles({
  iconBackground: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

type ImgWithStyles = ImgProps & WithStyles<typeof styles>;

interface Props extends ImgWithStyles {
  readonly icon: string;
  readonly dia: number;
  readonly circleColor?: string;
  readonly iconClasses?: string;
}

class CircleImg extends React.PureComponent<Props> {
  public render(): JSX.Element {
    const { 
      circleColor, 
      classes, 
      icon, 
      dia, 
      iconClasses, 
      ...props 
    } = this.props;

    const style = {
      height: dia,
      width: dia,
      borderRadius: "50%",
      backgroundColor: circleColor ? circleColor : "#f5f7f9",
    };

    return (
      <div className={classNames(classes.iconBackground, iconClasses)} style={style}>
        <Img src={icon} {...props} />
      </div>
    );
  }
}

export default withStyles(styles)(CircleImg);
