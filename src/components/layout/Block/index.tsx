import classNames from "classnames/bind";
import React, { PureComponent } from "react";
import { capitalize } from "~/theme/css";
import { Size } from "~/theme/size";
import styles from "./index.scss";

const cx: any = classNames.bind(styles);

type Props = {
  readonly margin?: Size;
  readonly padding?: Size;
  readonly align?: "center" | "right";
  readonly className?: string;
};

class Block extends PureComponent<Props> {
  public render(): JSX.Element {
    const { margin, padding, align, children, className, ...props } = this.props;

    const paddingStyle = padding ? capitalize(padding, "padding") : undefined;
    return (
      <div className={cx(className, margin, paddingStyle, align)} {...props}>
        {children}
      </div>
    );
  }
}

export default Block;
