import * as React from "react";
import Link from "~/components/layout/Link";
import Typography from "~/components/layout/Typography";
import { LOG_IN_ROUTE } from "~/containers/routes";

const LoginSection = () => (
  <React.Fragment>
    <Typography variant="subtitle1" inline>
      {"Already have an account?\u00a0"}
    </Typography>
    <Link to={LOG_IN_ROUTE}>
      <Typography variant="subtitle1" color="primary" underlined inline>
        Log In
      </Typography>
    </Link>
  </React.Fragment>
);

export default LoginSection;
