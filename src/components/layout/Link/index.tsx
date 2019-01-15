import * as React from "react";
import { Link as RouterLink, LinkProps } from "react-router-dom";

// use type alias not interface for equality (unless we extend it)
type Props = LinkProps;

// Note that react-router-dom Link cannot handle external URLS
// So we need to use "a" for external links
// https://github.com/ReactTraining/react-router/issues/1147
const Link = ({ children, to, ...rest }: Props) => {
  // to is LocationDescriptor<any>, external link check only works for strings
  if (typeof to === "string") {
    // this matches for https://foo.bar/ http://foo.bar/ //foo.bar/
    // update if we need more protocols
    if (/^(https?:)?\/\//.test(to)) {
      return (
        <a href={to} {...rest}>
          {children}
        </a>
      );
    }
  }
  return (
    <RouterLink to={to} {...rest}>
      {children}
    </RouterLink>
  );
};

export default Link;
