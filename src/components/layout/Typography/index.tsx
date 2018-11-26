import Typography, { TypographyProps } from "@material-ui/core/Typography";
import classNames from "classnames";
import * as React from "react";
import styles from "./index.scss";

const cx = classNames.bind(styles);

interface Props extends TypographyProps {
  readonly underlined?: boolean;
}

const IovTypography = ({ underlined, ...rest }: Props) => {
  const typographyClassnames = cx({ underlined });

  return <Typography className={typographyClassnames} {...rest} />;
};

export default IovTypography;
