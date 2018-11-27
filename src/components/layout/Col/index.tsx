import classNames from "classnames/bind";
import React from "react";
import { capitalize } from "~/theme/css";
import styles from "./index.scss";

const cx: any = classNames.bind(styles);

interface Order {
  readonly xs?: number;
  readonly sm?: number;
  readonly md?: number;
  readonly lg?: number;
}

interface Props {
  readonly order?: Order;
  readonly start?: "xs" | "sm" | "md" | "lg";
  readonly center?: "xs" | "sm" | "md" | "lg";
  readonly end?: "xs" | "sm" | "md" | "lg";
  readonly top?: "xs" | "sm" | "md" | "lg";
  readonly middle?: "xs" | "sm" | "md" | "lg";
  readonly bottom?: "xs" | "sm" | "md" | "lg";
  readonly around?: "xs" | "sm" | "md" | "lg";
  readonly between?: "xs" | "sm" | "md" | "lg";
  readonly margin?: "sm" | "md" | "lg" | "xl";
  readonly layout?: "inherit" | "block" | "column";
  readonly overflow?: boolean;
  readonly xs?: number | boolean;
  readonly sm?: number | boolean;
  readonly md?: number | boolean;
  readonly lg?: number | boolean;
  readonly xsOffset?: number;
  readonly smOffset?: number;
  readonly mdOffset?: number;
  readonly lgOffset?: number;
  readonly className?: string;
  readonly children: React.ReactNode;
}

const Col = ({
  children,
  margin,
  layout = "inherit",
  overflow,
  xs,
  sm,
  md,
  lg,
  start,
  center,
  end,
  top,
  middle,
  bottom,
  around,
  order,
  between,
  xsOffset,
  smOffset,
  mdOffset,
  lgOffset,
  className,
  ...props
}: Props) => {
  const colClassNames: string = cx(
    styles.col,
    capitalize(center, "center"),
    capitalize(start, "start"),
    capitalize(end, "end"),
    capitalize(top, "top"),
    capitalize(middle, "middle"),
    capitalize(bottom, "bottom"),
    capitalize(around, "around"),
    capitalize(between, "between"),
    capitalize(margin, "margin"),
    capitalize(xs, "xs"),
    capitalize(sm, "sm"),
    capitalize(md, "md"),
    capitalize(lg, "lg"),
    capitalize(order ? order.lg : undefined, 'orderLg'),
    capitalize(order ? order.md : undefined, 'orderMd'),
    capitalize(order ? order.xs : undefined, 'orderXs'),
    capitalize(order ? order.sm : undefined, 'orderSm'),
    capitalize(xsOffset, "xsOffset"),
    capitalize(smOffset, "smOffset"),
    capitalize(mdOffset, "mdOffset"),
    capitalize(lgOffset, "lgOffset"),
    { overflow },
    layout,
    className,
  );

  return (
    <div className={colClassNames} {...props}>
      {children}
    </div>
  );
};

export default Col;
