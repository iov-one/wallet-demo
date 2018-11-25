import classNames from "classnames";
import React from "react";
import { capitalize } from "~/theme/css";
import styles from "./index.scss";

const cx = classNames.bind(styles);

interface Props {
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
  between,
  xsOffset,
  smOffset,
  mdOffset,
  lgOffset,
  className,
  ...props
}: Props) => {
  const colClassNames = cx(
    "col",
    center ? capitalize(center, "center") : undefined,
    start ? capitalize(start, "start") : undefined,
    end ? capitalize(end, "end") : undefined,
    top ? capitalize(top, "top") : undefined,
    middle ? capitalize(middle, "middle") : undefined,
    bottom ? capitalize(bottom, "bottom") : undefined,
    around ? capitalize(around, "around") : undefined,
    between ? capitalize(between, "between") : undefined,
    margin ? capitalize(margin, "margin") : undefined,
    xs ? capitalize(xs, "xs") : undefined,
    sm ? capitalize(sm, "sm") : undefined,
    md ? capitalize(md, "md") : undefined,
    lg ? capitalize(lg, "lg") : undefined,
    xsOffset ? capitalize(xsOffset, "xsOffset") : undefined,
    smOffset ? capitalize(smOffset, "smOffset") : undefined,
    mdOffset ? capitalize(mdOffset, "mdOffset") : undefined,
    lgOffset ? capitalize(lgOffset, "lgOffset") : undefined,
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
