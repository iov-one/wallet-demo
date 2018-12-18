import React, { PureComponent } from "react";
import { Badge } from "@material-ui/core";
import classNames from "classnames/bind";

import styles from "./index.scss";

const cx: any = classNames.bind(styles);

interface Props {
  readonly icon: string;
  readonly badgeIcon: string;
  readonly width?: number;
  readonly height?: number;
  readonly background?: string;
}

class BadgeIcon extends PureComponent<Props> {

  public render(): JSX.Element {
    const {
      icon,
      badgeIcon,
      width,
      height,
      background,
    } = this.props;

    const style = {
      width: (width ? width : undefined),
      height: (height ? height : undefined),
      background: (background ? background : undefined)
    }

    return (
      <Badge
        badgeContent={
          <img className={cx('badge-icon')} src={badgeIcon} alt="Badge Icon" />
        } color="primary" >

        <div className={cx('badge-image')} style={style}>
          <img src={icon} alt="Icon" />
        </div>
      </Badge>
    );
  }
}

export default BadgeIcon;