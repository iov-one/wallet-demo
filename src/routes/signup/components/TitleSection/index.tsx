import * as React from "react";
import Typography from "~/components/layout/Typography";

const TitleSection = () => (
  <React.Fragment>
    <Typography variant="h4" color="primary" weight="light" inline>
      {"Get started\u00a0"}
    </Typography>
    <Typography variant="h4" inline weight="light">
      with your first blockchain wallet.
    </Typography>
  </React.Fragment>
);

export default TitleSection;
