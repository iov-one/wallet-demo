import classNames from "classnames/bind";
import * as React from "react";
import { capitalize } from "~/theme/css";
import { Size } from "~/theme/size";
import styles from "./index.scss";

const cx: any = classNames.bind(styles);

interface Props {
  readonly root?: boolean;
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly margin?: Size;
  readonly padding?: Size;
  readonly align?: "center" | "end" | "start";
  readonly shrink?: boolean;
  readonly nowrap?: boolean;
}

const Grid = ({ children, root, className, margin, padding, align, shrink, nowrap, ...props }: Props) => {
  const rowClassNames = cx(
    styles.grid,
    capitalize(margin, "margin"),
    capitalize(padding, "padding"),
    capitalize(align, "align"),
    { shrink, root, nowrap },
    className,
  );

  return (
    <div className={rowClassNames} {...props}>
      {children}
    </div>
  );
};

export default Grid;