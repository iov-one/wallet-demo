import classNames from "classnames/bind";
import * as React from "react";
import { capitalize } from "~/theme/css";
import { Size } from "~/theme/size";
import styles from "./index.scss";

const cx: any = classNames.bind(styles);

export interface BlockProps {
  readonly grow?: boolean;
  readonly overlap?: boolean;
  readonly scroll?: boolean;
  readonly margin?: Size;
  readonly padding?: Size;
  readonly style?: object;
  readonly align?: "center" | "right";
  readonly className?: string;
  readonly maxWidth?: number;
  readonly offsetXs?: 2 | 4 | 6 | 8;
  readonly offsetSm?: 2 | 4 | 6 | 8;
  readonly offsetMd?: 2 | 4 | 6 | 8;
  readonly onClick?: React.MouseEventHandler<Element>;
}

class Block extends React.PureComponent<BlockProps> {
  public render(): JSX.Element {
    const {
      margin,
      grow,
      padding,
      scroll,
      offsetXs,
      offsetSm,
      offsetMd,
      overlap,
      align,
      maxWidth,
      children,
      className,
      style,
      ...props
    } = this.props;
    const styleCombined = {
      ...style,
      maxWidth: maxWidth ? `${maxWidth}px` : undefined,
    };
    const paddingStyle = padding ? capitalize(padding, "padding") : undefined;
    const blockClasses = cx(
      className,
      margin,
      paddingStyle,
      align,
      capitalize(offsetXs, "smOffset"),
      capitalize(offsetSm, "smOffset"),
      capitalize(offsetMd, "mdOffset"),
      { grow, scroll, overlap },
    );

    return (
      <div className={blockClasses} style={styleCombined} {...props}>
        {children}
      </div>
    );
  }
}

export default Block;
