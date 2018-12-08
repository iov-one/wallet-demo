import Typography, { TypographyProps } from "@material-ui/core/Typography";
import classNames from "classnames/bind";
import * as React from "react";
import styles from "./index.scss";

const cx: any = classNames.bind(styles);

interface Props extends TypographyProps {
  readonly underlined?: boolean;
  readonly inline?: boolean;
  readonly weight?: "extralight" | "light" | "regular" | "semibold";
}

const IovTypography = ({ underlined, inline, weight, className, ...rest }: Props) => {
  const typographyClassnames = cx(className, { underlined, inline }, weight);

  return <Typography {...rest} className={typographyClassnames} />;
};

export default IovTypography;
