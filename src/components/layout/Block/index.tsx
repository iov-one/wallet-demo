import classNames from "classnames/bind";
import React, { PureComponent } from "react";
import { getMagnitudeFrom } from "~/components/layout/GridItem/magnitudeCalculator";
import { capitalize } from "~/theme/css";
import { Size } from "~/theme/size";
import styles from "./index.scss";

const cx: any = classNames.bind(styles);

interface Props {
  readonly grow?: boolean;
  readonly overlap?: boolean;
  readonly scroll?: boolean;
  readonly margin?: Size;
  readonly padding?: Size;
  readonly align?: "center" | "right";
  readonly className?: string;
  readonly maxWidth?: number;
  readonly offset?: 2 | 4 | 6 | 8;
}

const calculateStyleBased = (maxWidth?: number, offset?: 2 | 4 | 6 | 8) => {
  if (!maxWidth && !offset) {
    return undefined;
  }

  let style = {};

  if (offset) {
    const offsetUnit = getMagnitudeFrom(offset / 2);
    style = { ...style, marginLeft: offsetUnit, marginRight: offsetUnit, width: "initial" };
  }

  if (maxWidth) {
    style = { ...style, maxWidth: `${maxWidth}px` };
  }

  return style;
};

class Block extends PureComponent<Props> {
  public render(): JSX.Element {
    const {
      margin,
      grow,
      padding,
      scroll,
      offset,
      overlap,
      align,
      maxWidth,
      children,
      className,
      ...props
    } = this.props;
    const style = calculateStyleBased(maxWidth, offset);
    const paddingStyle = padding ? capitalize(padding, "padding") : undefined;
    const blockClasses = cx(className, margin, paddingStyle, align, { grow, scroll, overlap });

    return (
      <div className={blockClasses} style={style} {...props}>
        {children}
      </div>
    );
  }
}

export default Block;
