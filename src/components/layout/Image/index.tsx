import classNames from "classnames/bind";
import * as React from "react";

import styles from "./index.scss";

const cx: any = classNames.bind(styles);

export interface ImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  readonly cover?: boolean;
  readonly alt: string;
  readonly fullwidth?: boolean;
  readonly bordered?: boolean;
  readonly className?: string;
  readonly style?: React.CSSProperties;
}

class Img extends React.PureComponent<ImgProps> {
  public render(): JSX.Element {
    const { fullwidth, alt, cover, bordered, className, style, ...props } = this.props;

    return (
      <img
        alt={alt}
        style={style}
        {...props}
        className={cx(styles.img, { fullwidth, bordered, cover }, className)}
      />
    );
  }
}

export default Img;
