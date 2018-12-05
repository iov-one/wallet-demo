import classNames from "classnames/bind";
import React, { PureComponent } from "react";
import { capitalize } from "~/theme/css";
import { Size } from "~/theme/size";
import styles from "./index.scss";

const cx: any = classNames.bind(styles);

interface Props {
  readonly grow?: boolean;
  readonly scroll?: boolean;
  readonly margin?: Size;
  readonly padding?: Size;
  readonly align?: "center" | "right";
  readonly className?: string;
  readonly maxWidth?: number;
}

class Block extends PureComponent<Props> {
  public render(): JSX.Element {
    const { margin, grow, padding, scroll, align, maxWidth, children, className, ...props } = this.props;
    const style = maxWidth ? { maxWidth: `${maxWidth}px` } : undefined;
    const paddingStyle = padding ? capitalize(padding, "padding") : undefined;
    const blockClasses = cx(className, margin, paddingStyle, align, { grow, scroll });

    return (
      <div className={blockClasses} style={style} {...props}>
        {children}
      </div>
    );
  }
}

export default Block;
