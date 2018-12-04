import Typography, { TypographyProps } from "@material-ui/core/Typography";
import classNames from "classnames/bind";
import * as React from "react";
import styles from "./index.scss";

const cx: any = classNames.bind(styles);

interface Props extends TypographyProps {
  readonly underlined?: boolean;
  readonly inline?: boolean;
  readonly weight?: "light" | "regular" | "semibold"
}

const IovTypography = ({ underlined, inline, weight, ...rest }: Props) => {
  const typographyClassnames = cx({ underlined, inline}, weight);

  return <Typography {...rest} className={typographyClassnames} />;
};

export default IovTypography;
