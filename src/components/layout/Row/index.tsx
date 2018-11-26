import classNames from "classnames/bind";
import * as React from "react";
import { capitalize } from "~/theme/css";
import { Size } from "~/theme/size";
import styles from "./index.scss";

const cx: any = classNames.bind(styles);

interface Props {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly margin?: Size;
  readonly align?: "center" | "end" | "start";
  readonly grow?: boolean;
}

const Row = ({ children, className, margin, align, grow, ...props }: Props) => {
  const rowClassNames = cx(
    styles.row,
    margin ? capitalize(margin, "margin") : undefined,
    align ? capitalize(align, "align") : undefined,
    { grow },
    className,
  );

  return (
    <div className={rowClassNames} {...props}>
      {children}
    </div>
  );
};

export default Row;
